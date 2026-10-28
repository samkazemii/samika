(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const i18n = window.SamikaI18n;
  const t = (source, values) => i18n?.t(source, values) || source;
  function setLocalizedText(element, source, values) {
    if (i18n) i18n.setText(element, source, values);
    else if (element) element.textContent = t(source, values);
  }
  const createBackdrop = $("#createBackdrop");
  const roomBackdrop = $("#roomBackdrop");
  const joinBackdrop = $("#joinBackdrop");
  const toast = $("#toast");
  const recentRoomsKey = "samika-recent-rooms";
  const peerConnections = new Map();
  const peerNames = new Map();
  const remoteStreams = new Map();
  const videoTiles = new Map();
  const videoModes = new Map();
  const signalQueues = new Map();
  let roomAdmins = new Set();

  let activeFilter = "all";
  let toastTimer;
  let activeRoomName = t("اتاق سامیکا");
  let activeRoomId = "";
  let displayName = "";
  let selfId = "";
  let socket = null;
  let localAudioTrack = null;
  let cameraTrack = null;
  let shareStream = null;
  let stoppingShare = false;
  let intentionalLeave = false;
  let chatVisible = true;
  let pendingRoom = null;
  let sharedMedia = null;
  let sharedGame = null;
  let youtubePlayer = null;
  let youtubeApiPromise = null;
  let seekingMedia = false;
  let mediaAutoplayBlocked = false;
  let serverClockOffset = 0;
  let deferredInstallPrompt = null;

  try { displayName = localStorage.getItem("samika-display-name") || ""; } catch {}

  function announce(message, values, duration = 2800) {
    setLocalizedText(toast, message, values);
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), duration);
  }
  function showBackdrop(backdrop) {
    backdrop.classList.add("open");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function hideBackdrop(backdrop) {
    backdrop.classList.remove("open");
    backdrop.setAttribute("aria-hidden", "true");
    if (!$(".modal-backdrop.open")) document.body.style.overflow = "";
  }
  function randomRoomCode() {
    const alphabet = "23456789abcdefghjkmnpqrstuvwxyz";
    const bytes = crypto.getRandomValues(new Uint8Array(24));
    return [...bytes].map(byte => alphabet[byte % alphabet.length]).join("");
  }
  function getDisplayName() {
    const input = $("#displayName").value.trim();
    displayName = input.slice(0, 28);
    if (displayName) try { localStorage.setItem("samika-display-name", displayName); } catch {}
    return displayName;
  }
  function parseSharedMedia(value) {
    let url;
    try { url = new URL(value.trim()); } catch { return null; }
    if (url.protocol !== "https:" || url.username || url.password) return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (["youtube.com", "m.youtube.com", "music.youtube.com", "youtube-nocookie.com", "youtu.be"].includes(host)) {
      const id = host === "youtu.be" ? url.pathname.split("/").filter(Boolean)[0]
        : (url.searchParams.get("v") || url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1]);
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? { url: `https://www.youtube.com/watch?v=${id}`, kind: "youtube", videoId: id } : null;
    }
    return /\.(mp4|m4v|webm|ogv|mov|m3u8)$/i.test(url.pathname) ? { url: url.href, kind: "direct" } : null;
  }
  function loadYouTubeApi() {
    if (window.YT?.Player) return Promise.resolve(window.YT);
    if (youtubeApiPromise) return youtubeApiPromise;
    youtubeApiPromise = new Promise((resolve, reject) => {
      const previousReady = window.onYouTubeIframeAPIReady;
      const timeout = setTimeout(() => reject(new Error("YouTube player did not load")), 15000);
      window.onYouTubeIframeAPIReady = () => {
        clearTimeout(timeout);
        if (typeof previousReady === "function") previousReady();
        resolve(window.YT);
      };
      let script = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!script) {
        script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.onerror = () => { clearTimeout(timeout); reject(new Error("YouTube player could not load")); };
        document.head.append(script);
      }
    });
    return youtubeApiPromise;
  }
  function formatMediaTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const total = Math.floor(seconds);
    return total >= 3600 ? `${Math.floor(total / 3600)}:${String(Math.floor(total / 60) % 60).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`
      : `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
  }
  function mediaDuration() {
    if (sharedMedia?.kind === "youtube") return youtubePlayer?.getDuration?.() || 0;
    return $("#sharedVideo").duration || 0;
  }
  function actualMediaTime() {
    if (sharedMedia?.kind === "youtube") return youtubePlayer?.getCurrentTime?.() || 0;
    return $("#sharedVideo").currentTime || 0;
  }
  function targetMediaTime(state = sharedMedia) {
    if (!state) return 0;
    return Math.max(0, Number(state.currentTime) + (state.playing ? Math.max(0, Date.now() + serverClockOffset - Number(state.updatedAt || Date.now())) / 1000 : 0));
  }
  function setMediaPlayIcon(playing) {
    const button = $("#mediaPlay");
    button.textContent = playing ? "Ⅱ" : "▶";
    button.setAttribute("aria-label", t(playing ? "توقف ویدئو" : "پخش ویدئو"));
    button.title = t(playing ? "توقف ویدئو" : "پخش ویدئو");
  }
  function updateMediaControls() {
    const duration = mediaDuration();
    const current = actualMediaTime();
    $("#mediaCurrent").textContent = formatMediaTime(current);
    $("#mediaDuration").textContent = formatMediaTime(duration);
    if (duration > 0 && !seekingMedia) $("#mediaSeek").value = String(Math.round(Math.min(1, current / duration) * 1000));
    const playing = sharedMedia?.kind === "youtube" ? youtubePlayer?.getPlayerState?.() === 1 : !$("#sharedVideo").paused;
    setMediaPlayIcon(playing);
  }
  function updateMediaPermissions() {
    const isAdmin = Boolean(selfId && roomAdmins.has(selfId));
    const mediaUrl = $("#mediaUrl");
    const loadButton = $("#mediaForm button[type=submit]");
    mediaUrl.disabled = !isAdmin;
    mediaUrl.placeholder = t(isAdmin ? "لینک YouTube یا ویدئوی مستقیم MP4/WebM" : "فقط ادمین می‌تواند ویدئو را تغییر دهد");
    loadButton.disabled = !isAdmin;
    setLocalizedText(loadButton, isAdmin ? "پخش برای همه" : "کنترل دست ادمین");
    $("#mediaPlay").hidden = !isAdmin;
    $("#mediaSeek").hidden = !isAdmin;
    $("#mediaClear").hidden = !isAdmin;
  }
  function setRoomAdmins(ids, promotedPeerId = "", promotedName = "") {
    const wasAdmin = Boolean(selfId && roomAdmins.has(selfId));
    roomAdmins = new Set(Array.isArray(ids) ? ids.filter(id => typeof id === "string") : []);
    updateMediaPermissions();
    updateParticipants();
    if (!wasAdmin && selfId && roomAdmins.has(selfId)) announce("شما ادمین اتاق شدید");
    else if (promotedPeerId && promotedPeerId !== selfId) {
      const name = promotedName || peerNames.get(promotedPeerId) || t("یکی از دوستان");
      announce("{{name}} ادمین اتاق شد", { name });
    }
  }
  function commandMedia(action, values = {}) {
    if (!selfId || !socket || socket.readyState !== WebSocket.OPEN) {
      announce("برای کنترل ویدئوی مشترک، اول به اتاق وصل شو");
      return false;
    }
    return send({ type: "media-command", action, ...values });
  }
  function syncMediaPlayer(state) {
    if (!state) return;
    const target = targetMediaTime(state);
    if (state.kind === "youtube") {
      if (!youtubePlayer?.getPlayerState) return;
      const now = youtubePlayer.getCurrentTime() || 0;
      if (Math.abs(now - target) > 1.1) youtubePlayer.seekTo(target, true);
      if (state.playing && youtubePlayer.getPlayerState() !== 1) youtubePlayer.playVideo();
      else if (!state.playing && youtubePlayer.getPlayerState() !== 2) youtubePlayer.pauseVideo();
      updateMediaControls();
      return;
    }
    const video = $("#sharedVideo");
    if (video.readyState >= 1 && Math.abs(video.currentTime - target) > 1.1) video.currentTime = target;
    if (state.playing && video.paused && !mediaAutoplayBlocked) video.play().catch(() => { mediaAutoplayBlocked = true; announce("برای شروع ویدئو، دکمهٔ پخش را در این دستگاه بزن"); });
    else if (!state.playing && !video.paused) video.pause();
    updateMediaControls();
  }
  function ensureYouTubeRoot() {
    let root = $("#youtubePlayer");
    if (root && root.tagName.toLowerCase() !== "div") {
      const replacement = document.createElement("div"); replacement.id = "youtubePlayer";
      root.replaceWith(replacement); root = replacement;
    }
    if (!root) {
      root = document.createElement("div"); root.id = "youtubePlayer";
      $(".shared-surface").append(root);
    }
    return root;
  }
  function destroyYouTubePlayer() {
    try { youtubePlayer?.destroy?.(); } catch {}
    youtubePlayer = null;
    const root = ensureYouTubeRoot();
    root.replaceChildren();
    root.hidden = true;
    return root;
  }
  function createYouTubePlayer(state) {
    loadYouTubeApi().then(YT => {
      if (sharedMedia?.videoId !== state.videoId) return;
      const root = ensureYouTubeRoot(); root.hidden = false;
      youtubePlayer = new YT.Player(root, {
        width: "100%", height: "100%", videoId: state.videoId,
        playerVars: { autoplay: 0, controls: 0, playsinline: 1, rel: 0, origin: location.origin },
        events: {
          onReady: event => { if (sharedMedia?.videoId === state.videoId) syncMediaPlayer(sharedMedia); },
          onStateChange: updateMediaControls,
          onError: () => announce("این ویدئوی YouTube اجازهٔ پخش در سایت‌های دیگر را نمی‌دهد"),
          onAutoplayBlocked: () => { mediaAutoplayBlocked = true; announce("برای شروع ویدئو، دکمهٔ پخش را در این دستگاه بزن"); },
        },
      });
    }).catch(() => announce("پخش‌کنندهٔ YouTube بارگیری نشد؛ اتصال اینترنت را بررسی کن"));
  }
  function applyMediaState(state) {
    const player = $("#sharedPlayer");
    const stage = $(".room-stage");
    if (!state) {
      sharedMedia = null;
      mediaAutoplayBlocked = false;
      player.hidden = true; stage.classList.remove("has-shared-media");
      $("#sharedVideo").pause(); $("#sharedVideo").removeAttribute("src"); $("#sharedVideo").load();
      destroyYouTubePlayer();
      $("#mediaUrl").value = "";
      updateMediaPermissions();
      return;
    }
    const changed = sharedMedia?.url !== state.url || sharedMedia?.kind !== state.kind;
    sharedMedia = state;
    player.hidden = false; stage.classList.add("has-shared-media");
    if (changed) {
      mediaAutoplayBlocked = false;
      $("#mediaUrl").value = state.url;
      const root = destroyYouTubePlayer();
      root.hidden = state.kind !== "youtube";
      const video = $("#sharedVideo");
      if (state.kind === "youtube") {
        video.hidden = true; video.pause(); video.removeAttribute("src"); video.load();
        createYouTubePlayer(state);
      } else {
        video.hidden = false;
        root.hidden = true;
        video.src = state.url; video.load();
        video.onloadedmetadata = () => { if (sharedMedia?.url === state.url) syncMediaPlayer(sharedMedia); };
        video.onerror = () => announce("این لینک ویدئو پخش نمی‌شود؛ لینک مستقیم HTTPS از MP4 یا WebM بده");
      }
    } else syncMediaPlayer(state);
    updateMediaControls();
    updateMediaPermissions();
  }
  setInterval(() => {
    if (!sharedMedia || $("#sharedPlayer").hidden) return;
    updateMediaControls();
    if (sharedMedia.playing && Math.abs(actualMediaTime() - targetMediaTime()) > 2.2) syncMediaPlayer(sharedMedia);
  }, 900);
  function currentSignalUrl() {
    if (window.SAMIKA_SIGNALING_URL) return window.SAMIKA_SIGNALING_URL;
    if (location.protocol === "file:") return "";
    if (location.hostname === "samkazemii.github.io") return "wss://samika.onrender.com/signal";
    return `${location.protocol === "https:" ? "wss:" : "ws:"}//${location.host}/signal`;
  }
  function setNetworkStatus(text, connected = false) {
    const status = $("#networkStatus");
    setLocalizedText(status, text);
    status.style.color = connected ? "#9ae6c9" : "#ffc586";
  }
  function send(payload) {
    if (!socket || socket.readyState !== WebSocket.OPEN) return false;
    socket.send(JSON.stringify(payload));
    return true;
  }
  function setDeviceButton(kind, enabled) {
    const button = $(`[data-device="${kind}"]`);
    button.classList.toggle("on", enabled);
    button.classList.toggle("off", !enabled);
    $("span", button).textContent = t(kind === "audio"
      ? (enabled ? "میکروفن روشن" : "روشن‌کردن میکروفن")
      : (enabled ? "دوربین روشن" : "روشن‌کردن دوربین"));
  }
  function currentOutgoingVideo() {
    const shareVideo = shareStream?.getVideoTracks().find(track => track.readyState === "live");
    return shareVideo || (cameraTrack?.readyState === "live" && cameraTrack.enabled ? cameraTrack : null);
  }
  async function tuneVideoSender(sender, { maxBitrate = 1400000, maxFramerate = 20 } = {}) {
    try {
      const parameters = sender.getParameters();
      if (!parameters.encodings?.length) return;
      parameters.encodings = parameters.encodings.map(encoding => ({ ...encoding, maxBitrate, maxFramerate }));
      if ("degradationPreference" in parameters) parameters.degradationPreference = "maintain-framerate";
      await sender.setParameters(parameters);
    } catch (error) {
      console.debug("Samika could not apply optional video bandwidth limits", error);
    }
  }
  function videoSenderLimits() {
    const recipientCount = Math.max(peerConnections.size, 1);
    return shareStream
      ? { maxBitrate: Math.max(400000, Math.min(1400000, Math.floor(5600000 / recipientCount))), maxFramerate: 20 }
      : { maxBitrate: Math.max(300000, Math.min(800000, Math.floor(3200000 / recipientCount))), maxFramerate: 24 };
  }
  async function retunePeerVideoSenders() {
    const limits = videoSenderLimits();
    await Promise.all([...peerConnections.values()].map(state => tuneVideoSender(state.videoTransceiver.sender, limits)));
  }
  function activeLocalStream() {
    const stream = new MediaStream();
    if (localAudioTrack?.readyState === "live") stream.addTrack(localAudioTrack);
    const video = currentOutgoingVideo();
    if (video) stream.addTrack(video);
    return stream;
  }
  function roomHashUrl(roomId, roomName = activeRoomName) {
    const params = new URLSearchParams({ room: roomId, name: roomName || t("اتاق سامیکا") });
    return `${location.origin}${location.pathname}${location.search}#${params}`;
  }
  function replaceRoomHash(roomId, roomName = activeRoomName) {
    if (location.protocol === "file:") return;
    const suffix = roomId ? `#${new URLSearchParams({ room: roomId, name: roomName || t("اتاق سامیکا") })}` : "";
    history.replaceState(null, "", `${location.pathname}${location.search}${suffix}`);
  }
  function readRoomHash() {
    const params = new URLSearchParams(location.hash.slice(1));
    return { id: params.get("room") || "", name: params.get("name") || "" };
  }
  function readRecentRooms() {
    try {
      const rooms = JSON.parse(localStorage.getItem(recentRoomsKey) || "[]");
      return Array.isArray(rooms) ? rooms.filter(room => room && /^[a-zA-Z0-9_-]{3,80}$/.test(room.id) && typeof room.name === "string").slice(0, 12) : [];
    } catch { return []; }
  }
  function saveRecentRoom(roomId, roomName) {
    if (!roomId || location.protocol === "file:") return;
    const rooms = readRecentRooms().filter(room => room.id !== roomId);
    rooms.unshift({ id: roomId, name: String(roomName || t("اتاق سامیکا")).slice(0, 48), lastUsed: Date.now() });
    try { localStorage.setItem(recentRoomsKey, JSON.stringify(rooms.slice(0, 12))); } catch {}
    renderRecentRooms();
  }
  function renderRecentRooms() {
    const section = $("#recentRoomsSection");
    const list = $("#recentRoomsList");
    if (!section || !list) return;
    const rooms = readRecentRooms();
    list.replaceChildren();
    section.hidden = rooms.length === 0;
    for (const room of rooms) {
      const card = document.createElement("article"); card.className = "recent-room-card";
      const title = document.createElement("strong"); title.textContent = room.name;
      const details = document.createElement("small"); setLocalizedText(details, "این اتاق فقط در همین مرورگر ذخیره شده");
      const open = document.createElement("button"); open.type = "button"; open.className = "btn btn-primary"; open.dataset.openRecentRoom = room.id; setLocalizedText(open, "بازکردن اتاق");
      const copy = document.createElement("button"); copy.type = "button"; copy.className = "btn btn-ghost"; copy.dataset.copyRecentRoom = room.id; setLocalizedText(copy, "کپی لینک");
      const info = document.createElement("div"); info.className = "recent-room-info"; info.append(title, details);
      const actions = document.createElement("div"); actions.className = "recent-room-actions"; actions.append(open, copy);
      card.append(info, actions); list.append(card);
    }
  }

  function addChatMessage(name, text, self = false) {
    const item = document.createElement("div");
    item.className = `chat-message${self ? " self" : ""}`;
    const sender = document.createElement("b"); sender.textContent = name;
    const body = document.createElement("p"); body.textContent = text;
    item.append(sender, body);
    $("#chatMessages").append(item);
    $("#chatMessages").scrollTop = $("#chatMessages").scrollHeight;
  }
  function addSystemMessage(text, values) {
    const item = document.createElement("div");
    item.className = "system-message";
    setLocalizedText(item, text, values);
    $("#chatMessages").append(item);
    $("#chatMessages").scrollTop = $("#chatMessages").scrollHeight;
  }
  function refreshVideoGridLayout() {
    const grid = $("#videoGrid");
    grid.dataset.count = String(videoTiles.size);
    grid.classList.toggle("has-screen-share", [...videoTiles.values()].some(entry => entry.root.dataset.kind === "screen"));
  }
  async function requestFullscreenFor(element) {
    const request = element?.requestFullscreen || element?.webkitRequestFullscreen;
    if (request) {
      try { await request.call(element); return true; } catch {}
    }
    return false;
  }
  function fullscreenActive() {
    return Boolean(document.fullscreenElement || document.webkitFullscreenElement || $$("video").some(video => video.webkitDisplayingFullscreen));
  }
  async function exitFullscreen() {
    const nativeVideo = $$("video").find(video => video.webkitDisplayingFullscreen);
    if (nativeVideo?.webkitExitFullscreen) { nativeVideo.webkitExitFullscreen(); return; }
    const exit = document.exitFullscreen || document.webkitExitFullscreen;
    if (exit) await exit.call(document);
  }
  function clearPseudoFullscreen() {
    $$(".samika-pseudo-fullscreen").forEach(element => element.classList.remove("samika-pseudo-fullscreen"));
    document.body.classList.remove("samika-pseudo-fullscreen-active");
    refreshFullscreenControls();
  }
  async function toggleFullscreen(element, fallbackVideo = null, fallbackFrame = null) {
    if (element.classList.contains("samika-pseudo-fullscreen")) { clearPseudoFullscreen(); return true; }
    if (fullscreenActive()) { await exitFullscreen().catch(() => {}); return true; }
    clearPseudoFullscreen();
    // On iPhone Safari a video can enter the native media fullscreen while a div cannot.
    // Call this synchronously from the tap before awaiting any other browser API.
    if (!element.requestFullscreen && fallbackVideo?.webkitEnterFullscreen) {
      try { fallbackVideo.webkitEnterFullscreen(); return true; } catch {}
    }
    if (await requestFullscreenFor(element)) return true;
    if (fallbackVideo && await requestFullscreenFor(fallbackVideo)) return true;
    if (fallbackVideo?.webkitEnterFullscreen) {
      try { fallbackVideo.webkitEnterFullscreen(); return true; } catch {}
    }
    if (fallbackFrame && await requestFullscreenFor(fallbackFrame)) return true;
    // iOS Safari and some installed web apps do not expose the Fullscreen API.
    // Use a viewport-sized overlay there so received video remains enlargable.
    element.classList.add("samika-pseudo-fullscreen");
    document.body.classList.add("samika-pseudo-fullscreen-active");
    return true;
  }
  function updateTileFullscreenButton(tile) {
    const active = tile.root.classList.contains("samika-pseudo-fullscreen") || document.fullscreenElement === tile.root || document.webkitFullscreenElement === tile.root || tile.video.webkitDisplayingFullscreen;
    tile.fullscreen.textContent = active ? "×" : "⛶";
    const label = t(active ? "خروج از تمام‌صفحه" : "تمام‌صفحه‌کردن تصویر");
    tile.fullscreen.setAttribute("aria-label", label);
    tile.fullscreen.title = label;
  }
  function refreshFullscreenControls() {
    for (const tile of videoTiles.values()) updateTileFullscreenButton(tile);
    const mediaButton = $("#mediaFullscreen");
    if (mediaButton) {
      const video = $("#sharedVideo");
      const frame = $("#youtubePlayer iframe");
      const active = $("#sharedPlayer").classList.contains("samika-pseudo-fullscreen") || document.fullscreenElement === $("#sharedPlayer") || document.webkitFullscreenElement === $("#sharedPlayer") || video.webkitDisplayingFullscreen || document.fullscreenElement === frame || document.webkitFullscreenElement === frame;
      const label = t(active ? "خروج از تمام‌صفحه" : "تمام‌صفحه");
      mediaButton.setAttribute("aria-label", label);
      mediaButton.title = label;
      mediaButton.textContent = active ? "×" : "⛶";
    }
  }
  document.addEventListener("fullscreenchange", refreshFullscreenControls);
  document.addEventListener("webkitfullscreenchange", refreshFullscreenControls);
  $("#sharedVideo").addEventListener("webkitbeginfullscreen", refreshFullscreenControls);
  $("#sharedVideo").addEventListener("webkitendfullscreen", refreshFullscreenControls);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && document.body.classList.contains("samika-pseudo-fullscreen-active")) clearPseudoFullscreen();
  });
  window.addEventListener("samika:languagechange", refreshFullscreenControls);
  function createVideoTile(id, name, local = false) {
    let tile = videoTiles.get(id);
    if (tile) {
      if (local) setLocalizedText(tile.name, "{{name}} · شما", { name });
      else tile.name.textContent = name;
      return tile;
    }
    const root = document.createElement("div"); root.className = "video-tile"; root.dataset.kind = "none";
    const avatar = document.createElement("span"); avatar.className = "tile-avatar"; avatar.textContent = name.trim()[0] || "؟";
    const video = document.createElement("video"); video.autoplay = true; video.playsInline = true; video.setAttribute("webkit-playsinline", ""); video.muted = true;
    const label = document.createElement("span"); label.className = "video-name";
    if (local) setLocalizedText(label, "{{name}} · شما", { name }); else label.textContent = name;
    const audioState = document.createElement("span"); audioState.className = "audio-state";
    const audio = document.createElement("audio"); audio.autoplay = true; audio.hidden = true;
    const fullscreen = document.createElement("button"); fullscreen.type = "button"; fullscreen.className = "tile-fullscreen";
    fullscreen.textContent = "⛶"; fullscreen.hidden = true;
    fullscreen.addEventListener("click", async event => {
      event.stopPropagation();
      await toggleFullscreen(root, video);
      updateTileFullscreenButton(tile);
    });
    video.addEventListener("webkitbeginfullscreen", () => updateTileFullscreenButton(tile));
    video.addEventListener("webkitendfullscreen", () => updateTileFullscreenButton(tile));
    video.addEventListener("click", async () => {
      if (!fullscreenActive() && !root.classList.contains("samika-pseudo-fullscreen")) await toggleFullscreen(root, video);
      updateTileFullscreenButton(tile);
    });
    root.append(avatar, video, label, audioState, audio, fullscreen);
    $("#videoGrid").append(root);
    tile = { root, avatar, video, name: label, audio, audioState, fullscreen, local };
    videoTiles.set(id, tile);
    updateTileFullscreenButton(tile);
    refreshVideoGridLayout();
    return tile;
  }
  function updateVideoTile(id, name, stream, local = false) {
    const tile = createVideoTile(id, name, local);
    const mode = local
      ? (shareStream ? "screen" : (cameraTrack?.readyState === "live" && cameraTrack.enabled ? "camera" : "none"))
      : (videoModes.get(id) || "none");
    tile.root.dataset.kind = mode;
    const videoTracks = mode === "none" ? [] : (stream?.getVideoTracks().filter(track => track.readyState === "live" && track.enabled) || []);
    const audioTracks = stream?.getAudioTracks().filter(track => track.readyState === "live") || [];
    tile.root.classList.toggle("has-video", videoTracks.length > 0);
    tile.video.hidden = videoTracks.length === 0;
    tile.fullscreen.hidden = videoTracks.length === 0;
    tile.avatar.textContent = name.trim()[0] || "؟";
    if (videoTracks.length) {
      const videoStream = new MediaStream(videoTracks);
      if (tile.video.srcObject?.getVideoTracks().map(track => track.id).join() !== videoTracks.map(track => track.id).join()) tile.video.srcObject = videoStream;
      tile.video.play().catch(() => {});
    } else tile.video.srcObject = null;
    if (!local && audioTracks.length) {
      const audioStream = new MediaStream(audioTracks);
      if (tile.audio.srcObject?.getAudioTracks().map(track => track.id).join() !== audioTracks.map(track => track.id).join()) tile.audio.srcObject = audioStream;
      tile.audio.play().catch(() => announce("برای شنیدن صدا، پخش رسانه را در مرورگر فعال کن"));
    } else {
      tile.audio.pause(); tile.audio.srcObject = null;
    }
    const audioState = local
      ? (localAudioTrack?.enabled ? "میکروفن روشن" : "")
      : (audioTracks.length ? "صدا متصل" : "");
    if (audioState) setLocalizedText(tile.audioState, audioState); else tile.audioState.textContent = "";
    $(".room-stage").classList.toggle("has-video", [...videoTiles.values()].some(entry => !entry.video.hidden));
    refreshVideoGridLayout();
    return tile;
  }
  function unlockRemoteAudio() {
    for (const tile of videoTiles.values()) {
      if (!tile.local && tile.audio.srcObject) tile.audio.play().catch(() => {});
    }
  }
  document.addEventListener("pointerup", unlockRemoteAudio, { passive: true });
  document.addEventListener("touchend", unlockRemoteAudio, { passive: true });
  function removeVideoTile(id) {
    const tile = videoTiles.get(id);
    if (!tile) return;
    tile.video.srcObject = null; tile.audio.pause(); tile.audio.srcObject = null; tile.root.remove(); videoTiles.delete(id);
    videoModes.delete(id);
    $(".room-stage").classList.toggle("has-video", [...videoTiles.values()].some(entry => !entry.video.hidden));
    refreshVideoGridLayout();
  }
  function setRemoteVideoMode(id, mode) {
    const safeMode = mode === "screen" || mode === "camera" ? mode : "none";
    videoModes.set(id, safeMode);
    updateVideoTile(id, peerNames.get(id) || t("مهمان"), remoteStreams.get(id), false);
  }
  function refreshLocalTile() {
    if (!selfId) return;
    const stream = activeLocalStream();
    if (stream.getTracks().length) updateVideoTile(selfId, displayName, stream, true);
    else removeVideoTile(selfId);
  }

  function showReaction(message) {
    const stage = $(".room-stage");
    if (!stage) return;
    let feed = $(".reaction-feed", stage);
    if (!feed) {
      feed = document.createElement("div");
      feed.className = "reaction-feed";
      feed.setAttribute("aria-live", "polite");
      feed.setAttribute("aria-relevant", "additions");
      feed.setAttribute("aria-label", t("واکنش‌های تازه"));
      stage.append(feed);
    }
    const bubble = document.createElement("span");
    bubble.className = "reaction-chip";
    const emoji = document.createElement("span"); emoji.className = "reaction-chip-emoji"; emoji.textContent = message.emoji;
    bubble.append(emoji);
    if (message.name) {
      const name = document.createElement("span"); name.className = "reaction-chip-name"; name.textContent = message.name;
      bubble.append(name);
      bubble.title = `${message.name}: ${message.emoji}`;
      bubble.setAttribute("aria-label", `${message.name}: ${message.emoji}`);
    } else bubble.setAttribute("aria-label", message.emoji);
    feed.append(bubble);
    while (feed.children.length > 4) feed.firstElementChild.remove();
    setTimeout(() => bubble.remove(), 1700);
  }

  const challengePrompts = [
    "در یک جمله از حال امروزت بگو",
    "با سه ایموجی روزت را تعریف کن",
    "یک خاطرهٔ خنده‌دار تعریف کن",
    "از یکی از اعضای اتاق تعریف کن",
    "یک آهنگ را زمزمه کن تا بقیه حدس بزنند",
    "یک ادای بامزه دربیاور",
  ];

  function renderGame() {
    const root = $("#gameContent");
    if (!root) return;
    root.replaceChildren();
    if (!sharedGame) {
      const hint = document.createElement("p"); hint.className = "game-hint";
      setLocalizedText(hint, "یک بازی را انتخاب کن تا همهٔ اعضای اتاق با هم بازی کنند."); root.append(hint); return;
    }
    const game = sharedGame;
    const status = document.createElement("p"); status.className = "game-status";
    if (game.type === "tic") {
      const players = game.players || [];
      if (!players[1]) setLocalizedText(status, "منتظر بازیکن دوم هستیم…");
      else if (game.winner === "draw") setLocalizedText(status, "بازی مساوی شد!");
      else if (game.winner) {
        const winner = players[game.winner === "X" ? 0 : 1]?.name || "";
        setLocalizedText(status, "برنده: {{name}}", { name: winner });
      } else setLocalizedText(status, "نوبت {{name}}", { name: game.turnName || "" });
      const names = document.createElement("div"); names.className = "game-players";
      const playerLabel = document.createElement("span"); setLocalizedText(playerLabel, "X: {{name}}", { name: players[0]?.name || t("بازیکن اول") });
      const opponentLabel = document.createElement("span"); setLocalizedText(opponentLabel, "O: {{name}}", { name: players[1]?.name || t("بازیکن دوم") });
      names.append(playerLabel, opponentLabel);
      const board = document.createElement("div"); board.className = "tic-board";
      (game.board || Array(9).fill("")).forEach((value, index) => {
        const cell = document.createElement("button"); cell.type = "button"; cell.className = "tic-cell"; cell.dataset.ticMove = String(index); cell.textContent = value || "·";
        cell.disabled = Boolean(value) || !game.active || !players[1] || !players.some(player => player?.id === selfId) || game.turn !== selfId;
        board.append(cell);
      });
      const restart = document.createElement("button"); restart.type = "button"; restart.className = "btn btn-ghost"; restart.dataset.gameStart = "tic"; setLocalizedText(restart, "شروع دوباره");
      root.append(status, names, board, restart); return;
    }
    if (game.type === "guess") {
      if (game.winner) setLocalizedText(status, "{{name}} عدد را پیدا کرد!", { name: game.winner });
      else if (game.lastGuess) setLocalizedText(status, "{{name}} حدس زد {{value}}؛ {{hint}}", {
        name: game.lastGuess.name, value: game.lastGuess.value,
        hint: game.hint === "high" ? t("عدد کوچک‌تری بگو") : game.hint === "low" ? t("عدد بزرگ‌تری بگو") : "",
      });
      else setLocalizedText(status, "یک عدد بین ۱ تا ۵۰ را پیدا کنید.");
      const tries = document.createElement("small"); tries.className = "game-hint"; setLocalizedText(tries, "تعداد حدس‌ها: {{count}}", { count: game.tries || 0 });
      const form = document.createElement("form"); form.className = "guess-form"; form.id = "guessGameForm";
      const input = document.createElement("input"); input.type = "number"; input.min = "1"; input.max = "50"; input.required = true; input.inputMode = "numeric"; input.setAttribute("aria-label", t("حدس عدد")); input.disabled = !game.active;
      const guess = document.createElement("button"); guess.type = "submit"; guess.className = "btn btn-primary"; setLocalizedText(guess, "ثبت حدس"); guess.disabled = !game.active;
      form.append(input, guess);
      const restart = document.createElement("button"); restart.type = "button"; restart.className = "btn btn-ghost"; restart.dataset.gameStart = "guess"; setLocalizedText(restart, "شروع دور تازه");
      root.append(status, tries, form, restart); return;
    }
    if (game.type === "challenge") {
      const prompt = document.createElement("strong"); prompt.className = "challenge-prompt"; setLocalizedText(prompt, challengePrompts[game.promptIndex] || challengePrompts[0]);
      const by = document.createElement("small"); by.className = "game-hint"; setLocalizedText(by, "انتخاب‌کننده: {{name}}", { name: game.by || "" });
      const next = document.createElement("button"); next.type = "button"; next.className = "btn btn-primary"; next.dataset.nextChallenge = "true"; setLocalizedText(next, "چالش بعدی");
      root.append(prompt, by, next);
    }
  }

  function installGameActions() {
    const panel = $("#gamePanel");
    if (!panel) return;
    panel.addEventListener("click", event => {
      const start = event.target.closest("[data-game-start]");
      if (start) { send({ type: "game-command", action: "start", mode: start.dataset.gameStart }); return; }
      const cell = event.target.closest("[data-tic-move]");
      if (cell) { send({ type: "game-command", action: "move", index: Number(cell.dataset.ticMove) }); return; }
      if (event.target.closest("[data-next-challenge]")) send({ type: "game-command", action: "next-challenge", promptIndex: Math.floor(Math.random() * challengePrompts.length) });
    });
    panel.addEventListener("submit", event => {
      if (event.target.id !== "guessGameForm") return;
      event.preventDefault();
      const input = $("input[type=number]", event.target);
      if (input?.value) send({ type: "game-command", action: "guess", value: Number(input.value) });
    });
  }
  installGameActions();
  function updateParticipants() {
    const strip = $("#participantStrip");
    strip.replaceChildren();
    const participants = selfId ? [
      { id: selfId, name: displayName, local: true, isAdmin: roomAdmins.has(selfId) },
      ...[...peerNames].map(([id, name]) => ({ id, name, isAdmin: roomAdmins.has(id) })),
    ] : [];
    participants.forEach(participant => {
      const item = document.createElement("button"); item.type = "button"; item.className = "participant";
      const canPromote = Boolean(selfId && roomAdmins.has(selfId) && !participant.local && !participant.isAdmin);
      item.disabled = !canPromote;
      if (canPromote) {
        item.dataset.promoteAdmin = participant.id;
        item.setAttribute("aria-label", t("برای ادمین‌کردن {{name}} کلیک کن", { name: participant.name }));
      }
      const avatar = document.createElement("i"); avatar.className = "avatar"; avatar.textContent = participant.name.trim()[0] || "؟";
      const text = document.createElement("div");
      const name = document.createElement("span");
      if (participant.local) setLocalizedText(name, "{{name}} · شما", { name: participant.name }); else name.textContent = participant.name;
      const state = document.createElement("small");
      if (participant.isAdmin) setLocalizedText(state, participant.local ? "ادمین اتاق · شما" : "ادمین اتاق");
      else if (canPromote) setLocalizedText(state, "برای ادمین‌کردن کلیک کن");
      else setLocalizedText(state, participant.local ? "در این دستگاه" : "در اتاق");
      text.append(name, state); item.append(avatar, text); strip.append(item);
    });
  }
  function removePeer(peerId) {
    const state = peerConnections.get(peerId);
    if (state) state.pc.close();
    peerConnections.delete(peerId); peerNames.delete(peerId); remoteStreams.delete(peerId); signalQueues.delete(peerId); roomAdmins.delete(peerId);
    removeVideoTile(peerId); updateMediaPermissions(); updateParticipants();
    retunePeerVideoSenders();
  }

  async function ensurePeer(peerId, name = peerNames.get(peerId) || t("مهمان")) {
    if (peerConnections.has(peerId)) return peerConnections.get(peerId);
    peerNames.set(peerId, name);
    const config = window.SAMIKA_RTC_CONFIG || { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
    const pc = new RTCPeerConnection(config);
    const micStream = localAudioTrack ? new MediaStream([localAudioTrack]) : null;
    const outgoingVideo = currentOutgoingVideo();
    const videoStream = outgoingVideo ? new MediaStream([outgoingVideo]) : null;
    const micTransceiver = pc.addTransceiver(localAudioTrack || "audio", { direction: localAudioTrack ? "sendrecv" : "recvonly", ...(micStream ? { streams: [micStream] } : {}) });
    const videoTransceiver = pc.addTransceiver(outgoingVideo || "video", { direction: outgoingVideo ? "sendrecv" : "recvonly", ...(videoStream ? { streams: [videoStream] } : {}) });
    const shareAudio = shareStream?.getAudioTracks().find(track => track.readyState === "live") || null;
    const shareAudioTransceiver = pc.addTransceiver(shareAudio || "audio", {
      direction: shareAudio ? "sendrecv" : "recvonly",
      ...(shareAudio ? { streams: [shareStream] } : {}),
    });
    const state = {
      pc,
      polite: Boolean(selfId && selfId.localeCompare(peerId) > 0),
      makingOffer: false,
      ignoreOffer: false,
      settingRemoteAnswerPending: false,
      pendingCandidates: [],
      micTransceiver,
      videoTransceiver,
      shareAudioTransceiver,
    };
    peerConnections.set(peerId, state);
    createVideoTile(peerId, name, false);
    updateParticipants();

    pc.onicecandidate = event => { if (event.candidate) send({ type: "signal", to: peerId, candidate: event.candidate }); };
    pc.onnegotiationneeded = async () => {
      try {
        state.makingOffer = true;
        await pc.setLocalDescription();
        send({ type: "signal", to: peerId, description: pc.localDescription });
      } catch (error) {
        console.error("Samika negotiation failed", error);
        announce("برقراری ارتباط با یکی از اعضا ناموفق بود");
      } finally { state.makingOffer = false; }
    };
    pc.ontrack = event => {
      let stream = remoteStreams.get(peerId);
      if (!stream) { stream = new MediaStream(); remoteStreams.set(peerId, stream); }
      const track = event.track;
      if (!stream.getTracks().some(existing => existing.id === track.id)) stream.addTrack(track);
      updateVideoTile(peerId, peerNames.get(peerId) || name, stream, false);
      track.onended = () => updateVideoTile(peerId, peerNames.get(peerId) || name, stream, false);
    };
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "failed") announce("اتصال همتا برقرار نشد؛ این شبکه ممکن است به TURN نیاز داشته باشد");
    };
    if (outgoingVideo) retunePeerVideoSenders();
    return state;
  }
  async function handleSignal(message) {
    const state = await ensurePeer(message.from, message.name);
    const pc = state.pc;
    if (message.description) {
      const description = message.description;
      const readyForOffer = !state.makingOffer && (pc.signalingState === "stable" || state.settingRemoteAnswerPending);
      const offerCollision = description.type === "offer" && !readyForOffer;
      state.ignoreOffer = !state.polite && offerCollision;
      if (state.ignoreOffer) return;
      state.settingRemoteAnswerPending = description.type === "answer";
      if (offerCollision) await pc.setLocalDescription({ type: "rollback" });
      await pc.setRemoteDescription(description);
      state.settingRemoteAnswerPending = false;
      if (description.type === "offer") {
        await pc.setLocalDescription();
        send({ type: "signal", to: message.from, description: pc.localDescription });
      }
      for (const candidate of state.pendingCandidates.splice(0)) await pc.addIceCandidate(candidate).catch(() => {});
    }
    if (message.candidate) {
      if (!pc.remoteDescription) state.pendingCandidates.push(message.candidate);
      else {
        try { await pc.addIceCandidate(message.candidate); }
        catch (error) { if (!state.ignoreOffer) console.warn("Samika ICE candidate was rejected", error); }
      }
    }
  }
  async function attachDeviceTrack(kind, track) {
    for (const state of peerConnections.values()) {
      const transceiver = kind === "audio" ? state.micTransceiver : state.videoTransceiver;
      await transceiver.sender.replaceTrack(track);
      transceiver.direction = "sendrecv";
    }
    if (kind === "video") await retunePeerVideoSenders();
  }
  async function toggleDevice(kind) {
    const isAudio = kind === "audio";
    const existing = isAudio ? localAudioTrack : cameraTrack;
    const button = $(`[data-device="${kind}"]`);
    if (!selfId || !socket || socket.readyState !== WebSocket.OPEN) {
      announce("اول صبر کن اتصال اتاق برقرار شود؛ اگر نشد npm start را بررسی کن");
      return;
    }
    if (!isAudio && shareStream) { announce("هنگام شیر اسکرین، دوربین را نمی‌توان جداگانه تغییر داد"); return; }
    if (existing?.readyState === "live") {
      existing.enabled = !existing.enabled;
      setDeviceButton(kind, existing.enabled);
      if (!isAudio) send({ type: "video-mode", mode: existing.enabled ? "camera" : "none" });
      refreshLocalTile();
      announce(isAudio ? (existing.enabled ? "میکروفن روشن شد" : "میکروفن خاموش شد") : (existing.enabled ? "دوربین روشن شد" : "دوربین خاموش شد"));
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      announce("برای تماس، سامیکا را روی localhost یا یک نشانی HTTPS باز کن");
      return;
    }
    button.disabled = true;
    try {
      const mediaConstraints = isAudio
        ? { audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: false }
        : { audio: false, video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30, max: 30 }, facingMode: "user" } };
      const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
      const track = (isAudio ? stream.getAudioTracks() : stream.getVideoTracks())[0];
      if (!track) throw new Error("مرورگر رسانهٔ درخواستی را برنگرداند");
      if (isAudio) localAudioTrack = track; else cameraTrack = track;
      track.onended = () => {
        if (isAudio) localAudioTrack = null; else cameraTrack = null;
        if (!isAudio) send({ type: "video-mode", mode: "none" });
        setDeviceButton(kind, false); refreshLocalTile();
      };
      await attachDeviceTrack(kind, track);
      if (!isAudio) send({ type: "video-mode", mode: "camera" });
      setDeviceButton(kind, true); refreshLocalTile();
      announce(isAudio ? "میکروفن به اتاق وصل شد" : "دوربین به اتاق وصل شد");
    } catch (error) {
      console.error("Samika media permission failed", error);
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") announce("اجازهٔ استفاده از میکروفن یا دوربین داده نشد");
      else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") announce("میکروفن یا دوربین روی دستگاه پیدا نشد");
      else announce("اتصال رسانه انجام نشد؛ سامیکا را با HTTPS و در مرورگری به‌روز باز کن");
    } finally { button.disabled = false; }
  }
  async function stopScreenShare() {
    if (!shareStream || stoppingShare) return;
    stoppingShare = true;
    const oldStream = shareStream;
    shareStream = null;
    for (const state of peerConnections.values()) {
      const replacement = cameraTrack?.readyState === "live" && cameraTrack.enabled ? cameraTrack : null;
      await state.videoTransceiver.sender.replaceTrack(replacement).catch(() => {});
      state.videoTransceiver.direction = replacement ? "sendrecv" : "recvonly";
      if (state.shareAudioTransceiver) {
        await state.shareAudioTransceiver.sender.replaceTrack(null).catch(() => {});
        state.shareAudioTransceiver.direction = "recvonly";
      }
    }
    if (cameraTrack?.readyState === "live" && cameraTrack.enabled) await retunePeerVideoSenders();
    oldStream.getTracks().forEach(track => { track.onended = null; track.stop(); });
    send({ type: "video-mode", mode: cameraTrack?.readyState === "live" && cameraTrack.enabled ? "camera" : "none" });
    const button = $("[data-share]"); button.classList.remove("on", "off"); $("span", button).textContent = t("شیر اسکرین");
    refreshLocalTile();
    stoppingShare = false;
    announce("شیر اسکرین متوقف شد");
  }
  async function toggleScreenShare() {
    if (!selfId || !socket || socket.readyState !== WebSocket.OPEN) {
      announce("برای شیر اسکرین، اول باید به سرور اتاق وصل شوی");
      return;
    }
    if (shareStream) { await stopScreenShare(); return; }
    if (!navigator.mediaDevices?.getDisplayMedia) {
      announce("برای شروع اشتراک صفحه از دسکتاپ و Chrome یا Edge استفاده کن؛ با گوشی می‌توانی تصویر دریافتی را بزرگ کنی");
      return;
    }
    const mobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const button = $("[data-share]"); button.disabled = true;
    try {
      announce(mobileDevice
        ? "در گوشی، اگر پنجرهٔ اشتراک گزینهٔ «اشتراک صدا» داشت روشنش کن؛ iPhone و بعضی گوشی‌ها ممکن است صدای برنامه‌های دیگر مثل Instagram را به مرورگر ندهند"
        : "برای صدای ویدئوی ویندوز، در پنجرهٔ اشتراک «کل صفحه» و گزینهٔ «صدای سیستم» را انتخاب کن؛ برای صدای ویدئوی مرورگر، تب ویدئو را انتخاب کن", undefined, 5500);
      shareStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
          frameRate: { ideal: 20, max: 24 },
        },
        audio: { suppressLocalAudioPlayback: false },
        systemAudio: "include",
        windowAudio: "system",
        selfBrowserSurface: "exclude",
        surfaceSwitching: "include",
      });
      const videoTrack = shareStream.getVideoTracks()[0];
      if (!videoTrack) throw new Error("No screen video track was selected");
      const audioTrack = shareStream.getAudioTracks().find(track => track.readyState === "live") || null;
      videoTrack.onended = () => { if (shareStream) stopScreenShare(); };
      for (const state of peerConnections.values()) {
        await state.videoTransceiver.sender.replaceTrack(videoTrack);
        state.videoTransceiver.direction = "sendrecv";
        await state.shareAudioTransceiver.sender.replaceTrack(audioTrack);
        state.shareAudioTransceiver.direction = audioTrack ? "sendrecv" : "recvonly";
      }
      await retunePeerVideoSenders();
      send({ type: "video-mode", mode: "screen" });
      button.classList.add("on"); $("span", button).textContent = t("توقف شیر");
      refreshLocalTile();
      announce(audioTrack
        ? "تصویر و صدای صفحه برای اتاق فرستاده می‌شود"
        : mobileDevice
          ? "تصویر شیر شد؛ این دستگاه صدای صفحه را نداد. برای صدای Instagram، میکروفن و بلندگوی گوشی را روشن کن"
          : "تصویر ارسال می‌شود اما مرورگر ترک صدای سیستم را نداد؛ دوباره با Chrome یا Edge و انتخاب کل صفحه و صدای سیستم امتحان کن. برای صدای ویدئوی مرورگر، تب ویدئو را انتخاب کن",
      undefined, audioTrack ? 2800 : 6500);
    } catch (error) {
      for (const state of peerConnections.values()) {
        const replacement = cameraTrack?.readyState === "live" && cameraTrack.enabled ? cameraTrack : null;
        await state.videoTransceiver.sender.replaceTrack(replacement).catch(() => {});
        state.videoTransceiver.direction = replacement ? "sendrecv" : "recvonly";
        if (state.shareAudioTransceiver) {
          await state.shareAudioTransceiver.sender.replaceTrack(null).catch(() => {});
          state.shareAudioTransceiver.direction = "recvonly";
        }
      }
      const failedShare = shareStream; shareStream = null;
      failedShare?.getTracks().forEach(track => track.stop());
      if (cameraTrack?.readyState === "live" && cameraTrack.enabled) await retunePeerVideoSenders();
      send({ type: "video-mode", mode: cameraTrack?.readyState === "live" && cameraTrack.enabled ? "camera" : "none" });
      button.classList.remove("on"); $("span", button).textContent = t("شیر اسکرین");
      refreshLocalTile();
      if (error.name === "NotAllowedError") announce("اشتراک صفحه لغو شد");
      else announce("اشتراک صفحه شروع نشد");
    } finally { button.disabled = false; }
  }

  function handleServerMessage(message) {
    if (message.type === "joined") {
      selfId = message.selfId;
      setRoomAdmins(message.adminIds || []);
      if (Number.isFinite(message.serverNow)) serverClockOffset = message.serverNow - Date.now();
      activeRoomId = message.roomId;
      activeRoomName = message.roomName || activeRoomName;
      sharedGame = message.game || null;
      $("#activeRoomTitle").textContent = activeRoomName;
      setLocalizedText($("#chatStatus"), "{{name}} · وصل", { name: activeRoomName });
      setLocalizedText($("#roomId"), "کد {{code}}", { code: activeRoomId });
      replaceRoomHash(activeRoomId, activeRoomName);
      saveRecentRoom(activeRoomId, activeRoomName);
      setNetworkStatus("● سرور وصل است", true);
      applyMediaState(message.media || null);
      renderGame();
      updateParticipants();
      message.peers.forEach(peer => { peerNames.set(peer.id, peer.name); videoModes.set(peer.id, peer.videoMode || "none"); ensurePeer(peer.id, peer.name); });
      updateParticipants();
      return;
    }
    if (message.type === "peer-joined") {
      peerNames.set(message.peer.id, message.peer.name);
      videoModes.set(message.peer.id, message.peer.videoMode || "none");
      if (message.peer.isAdmin) roomAdmins.add(message.peer.id);
      updateParticipants();
      addSystemMessage("{{name}} وارد اتاق شد", { name: message.peer.name });
      return;
    }
    if (message.type === "room-roles") {
      setRoomAdmins(message.adminIds || [], message.promotedPeerId || "", message.promotedName || "");
      return;
    }
    if (message.type === "video-mode") {
      setRemoteVideoMode(message.peerId, message.mode);
      return;
    }
    if (message.type === "reaction") { showReaction(message); return; }
    if (message.type === "game-state") { sharedGame = message.game || null; renderGame(); return; }
    if (message.type === "media-state") {
      if (Number.isFinite(message.serverNow)) serverClockOffset = message.serverNow - Date.now();
      applyMediaState(message.media || null); return;
    }
    if (message.type === "peer-left") {
      const name = peerNames.get(message.peerId) || t("یکی از دوستان");
      removePeer(message.peerId); addSystemMessage("{{name}} از اتاق خارج شد", { name });
      return;
    }
    if (message.type === "signal") {
      const previous = signalQueues.get(message.from) || Promise.resolve();
      const queued = previous.then(() => handleSignal(message)).catch(error => { console.error(error); announce("برقراری تماس با یکی از اعضا ناموفق بود"); });
      signalQueues.set(message.from, queued);
      return;
    }
    if (message.type === "chat") { addChatMessage(message.name || t("مهمان"), message.text); return; }
    if (message.type === "error") {
      if (message.code === "admin-required") { announce("تنها ادمین‌های اتاق اجازهٔ کنترل ویدئو و مدیریت اعضا را دارند."); return; }
      setNetworkStatus("● ورود ناموفق", false);
      announce(message.message || "خطای اتصال");
    }
  }
  function connectToRoom() {
    const url = currentSignalUrl();
    if (!url) {
      setNetworkStatus("● سرور اجرا نشده", false);
      announce("برای تماس زنده، پوشه را با دستور npm start اجرا کن");
      return;
    }
    intentionalLeave = false;
    try { socket = new WebSocket(url); }
    catch (error) { console.error(error); setNetworkStatus("● نشانی سرور نامعتبر", false); return; }
    const candidate = socket;
    candidate.onmessage = event => {
      try { handleServerMessage(JSON.parse(event.data)); }
      catch (error) { console.error("Samika signaling message error", error); }
    };
    candidate.onopen = () => candidate.send(JSON.stringify({ type: "join", roomId: activeRoomId, roomName: activeRoomName, name: getDisplayName() }));
    candidate.onerror = () => {
      setNetworkStatus("● اتصال ناموفق", false);
      announce("سرور سامیکا در دسترس نیست؛ npm start را اجرا کن یا سرور را بررسی کن");
    };
    candidate.onclose = () => {
      if (!intentionalLeave && roomBackdrop.classList.contains("open")) {
        setNetworkStatus("● ارتباط قطع شد", false);
        announce("اتصال به اتاق قطع شد؛ صفحه را تازه‌سازی کن تا دوباره وصل شوی");
      }
    };
  }
  function openCreate() {
    $("#displayName").value = "";
    showBackdrop(createBackdrop);
    setTimeout(() => $("#roomName").focus(), 80);
  }
  function requestRoomJoin(name, roomCode) {
    pendingRoom = { name, roomCode };
    $("#joinDisplayName").value = "";
    setLocalizedText($("#joinRoomDescription"), "برای ورود به «{{room}}»، نام کاربری‌ات را وارد کن.", { room: name });
    showBackdrop(joinBackdrop);
    setTimeout(() => $("#joinDisplayName").focus(), 80);
  }
  function openRoom(name, roomCode = randomRoomCode()) {
    if (!getDisplayName()) { requestRoomJoin(name, roomCode); return false; }
    if (socket && socket.readyState !== WebSocket.CLOSED) leaveRoom(false);
    activeRoomName = name || t("اتاق سامیکا");
    activeRoomId = roomCode;
    sharedGame = null;
    $("#gamePanel").hidden = true; $("#chatMessages").hidden = false; $("#chatForm").hidden = false;
    $(".room-layout").classList.remove("games-open"); $("#gameToggle").classList.remove("on");
    saveRecentRoom(activeRoomId, activeRoomName);
    replaceRoomHash(activeRoomId, activeRoomName);
    $("#activeRoomTitle").textContent = activeRoomName;
    setLocalizedText($("#roomId"), "کد {{code}}", { code: activeRoomId });
    $("#chatMessages").replaceChildren();
    chatVisible = true;
    $("#chatPanel").hidden = false;
    $(".room-layout").classList.remove("chat-hidden");
    addSystemMessage("سلام، به سامیکا خوش آمدید! امیدوارم کنار دوستانتان لحظات خوبی داشته باشید. — سام کاظمی ✨");
    setNetworkStatus("● در حال اتصال…", false);
    hideBackdrop(createBackdrop);
    hideBackdrop(joinBackdrop);
    showBackdrop(roomBackdrop);
    connectToRoom();
    return true;
  }
  function leaveRoom(closeModal = true) {
    intentionalLeave = true;
    send({ type: "leave" });
    if (socket) {
      socket.onclose = null; socket.onerror = null; socket.onmessage = null; socket.onopen = null;
      socket.close(); socket = null;
    }
    for (const state of peerConnections.values()) state.pc.close();
    peerConnections.clear(); peerNames.clear(); remoteStreams.clear(); videoModes.clear(); signalQueues.clear();
    for (const id of [...videoTiles.keys()]) removeVideoTile(id);
    if (localAudioTrack) { localAudioTrack.onended = null; localAudioTrack.stop(); }
    if (cameraTrack) { cameraTrack.onended = null; cameraTrack.stop(); }
    const oldShareStream = shareStream;
    shareStream = null;
    oldShareStream?.getTracks().forEach(track => { track.onended = null; track.stop(); });
    localAudioTrack = null; cameraTrack = null; selfId = "";
    roomAdmins.clear(); updateMediaPermissions();
    sharedGame = null; renderGame();
    $("#gamePanel").hidden = true; $("#chatMessages").hidden = false; $("#chatForm").hidden = false;
    $(".room-layout").classList.remove("games-open"); $("#gameToggle").classList.remove("on");
    applyMediaState(null);
    setDeviceButton("audio", false); setDeviceButton("video", false);
    const shareButton = $("[data-share]"); shareButton.classList.remove("on", "off"); $("span", shareButton).textContent = t("شیر اسکرین");
    updateParticipants(); replaceRoomHash("");
    if (closeModal) hideBackdrop(roomBackdrop);
  }

  window.addEventListener("samika:languagechange", () => {
    setDeviceButton("audio", Boolean(localAudioTrack?.enabled));
    setDeviceButton("video", Boolean(cameraTrack?.readyState === "live" && cameraTrack.enabled));
    const shareButton = $("[data-share]");
    $("span", shareButton).textContent = t(shareStream ? "توقف شیر" : "شیر اسکرین");
    updateParticipants();
    updateMediaPermissions();
    for (const [id, tile] of videoTiles) {
      if (tile.local) updateVideoTile(id, displayName, activeLocalStream(), true);
    }
    updateMediaControls();
    renderRecentRooms();
    renderGame();
  });

  $$('[data-open-create]').forEach(button => button.addEventListener("click", openCreate));
  $$('[data-close-create]').forEach(button => button.addEventListener("click", () => hideBackdrop(createBackdrop)));
  createBackdrop.addEventListener("click", event => { if (event.target === createBackdrop) hideBackdrop(createBackdrop); });
  joinBackdrop.addEventListener("click", event => { if (event.target === joinBackdrop) { pendingRoom = null; hideBackdrop(joinBackdrop); replaceRoomHash(""); } });
  $("#createForm").addEventListener("submit", event => {
    event.preventDefault();
    if (!getDisplayName()) { $("#displayName").focus(); announce("نام کاربری را وارد کن تا بتوانی وارد اتاق شوی"); return; }
    const roomName = $("#roomName").value.trim() || t("دورهمی دوستانه");
    openRoom(roomName); $("#roomName").value = "";
    announce("اتاق خصوصی سامیکا ساخته شد؛ لینک دعوت را فقط برای افراد موردنظرت بفرست");
  });
  $("#joinForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = $("#joinDisplayName").value.trim().slice(0, 28);
    if (!name || !pendingRoom) { announce("نام کاربری را وارد کن تا بتوانی وارد اتاق شوی"); return; }
    displayName = name;
    $("#displayName").value = name;
    try { localStorage.setItem("samika-display-name", name); } catch {}
    const destination = pendingRoom; pendingRoom = null;
    openRoom(destination.name, destination.roomCode);
  });
  $$('[data-join]').forEach(button => button.addEventListener("click", () => requestRoomJoin(button.dataset.join, randomRoomCode())));
  $("#recentRoomsList")?.addEventListener("click", async event => {
    const open = event.target.closest("[data-open-recent-room]");
    if (open) {
      const room = readRecentRooms().find(item => item.id === open.dataset.openRecentRoom);
      if (room) openRoom(room.name, room.id);
      return;
    }
    const copy = event.target.closest("[data-copy-recent-room]");
    if (copy) {
      const room = readRecentRooms().find(item => item.id === copy.dataset.copyRecentRoom);
      if (!room) return;
      try { await navigator.clipboard.writeText(roomHashUrl(room.id, room.name)); announce("لینک دعوت کپی شد؛ دوستت با بازکردنش وارد همین اتاق می‌شود"); }
      catch { announce("مرورگر اجازهٔ کپی نداد؛ روی بازکردن اتاق بزن و لینک را کپی کن"); }
    }
  });
  $("#clearRecentRooms")?.addEventListener("click", () => {
    try { localStorage.removeItem(recentRoomsKey); } catch {}
    renderRecentRooms();
  });
  $("#mediaForm").addEventListener("submit", event => {
    event.preventDefault();
    const media = parseSharedMedia($("#mediaUrl").value);
    if (!media) { announce("لینک پشتیبانی نمی‌شود؛ لینک YouTube یا مستقیم MP4/WebM بده"); return; }
    commandMedia("load", { url: media.url });
  });
  $("#mediaPlay").addEventListener("click", () => {
    if (!sharedMedia) return;
    const video = $("#sharedVideo");
    const playing = sharedMedia.kind === "youtube" ? youtubePlayer?.getPlayerState?.() === 1 : !video.paused;
    if (playing) {
      if (sharedMedia.kind === "youtube") youtubePlayer?.pauseVideo?.(); else video.pause();
      commandMedia("pause", { currentTime: actualMediaTime() });
    } else {
      mediaAutoplayBlocked = false;
      if (sharedMedia.kind === "youtube") youtubePlayer?.playVideo?.(); else video.play().catch(() => announce("برای پخش، دوباره دکمهٔ پخش را بزن"));
      commandMedia("play", { currentTime: actualMediaTime() });
    }
    updateMediaControls();
  });
  $("#mediaSeek").addEventListener("pointerdown", () => { seekingMedia = true; });
  $("#mediaSeek").addEventListener("touchstart", () => { seekingMedia = true; }, { passive: true });
  $("#mediaSeek").addEventListener("input", () => {
    const duration = mediaDuration();
    $("#mediaCurrent").textContent = formatMediaTime(Number($("#mediaSeek").value) / 1000 * duration);
  });
  $("#mediaSeek").addEventListener("change", () => {
    if (!sharedMedia) { seekingMedia = false; return; }
    const seconds = Number($("#mediaSeek").value) / 1000 * mediaDuration();
    if (sharedMedia.kind === "youtube") youtubePlayer?.seekTo?.(seconds, true);
    else $("#sharedVideo").currentTime = seconds;
    commandMedia("seek", { currentTime: seconds });
    seekingMedia = false;
  });
  $("#mediaClear").addEventListener("click", () => commandMedia("clear"));
  $("#mediaFullscreen").addEventListener("click", async () => {
    const player = $("#sharedPlayer");
    const video = sharedMedia?.kind === "direct" ? $("#sharedVideo") : null;
    const frame = sharedMedia?.kind === "youtube" ? $("#youtubePlayer iframe") : null;
    await toggleFullscreen(player, video, frame);
    refreshFullscreenControls();
  });
  function applyRoomFilters() {
    const query = $("#roomSearch").value.trim().toLocaleLowerCase(i18n?.locale || "fa-IR");
    let visible = 0;
    $$(".room-card").forEach(card => {
      const categoryMatch = activeFilter === "all" || card.dataset.category === activeFilter;
      const searchMatch = !query || card.dataset.name.toLocaleLowerCase(i18n?.locale || "fa-IR").includes(query) || $("h3", card).textContent.toLocaleLowerCase(i18n?.locale || "fa-IR").includes(query);
      const show = categoryMatch && searchMatch;
      card.hidden = !show;
      if (show) visible++;
    });
    $("#emptyState").style.display = visible ? "none" : "block";
  }
  $$(".filter").forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    $$(".filter").forEach(filter => filter.classList.toggle("active", filter === button));
    applyRoomFilters();
  }));
  $("#roomSearch").addEventListener("input", applyRoomFilters);
  $("#closeRoom").addEventListener("click", () => leaveRoom());
  $("#participantStrip").addEventListener("click", event => {
    const participant = event.target.closest("[data-promote-admin]");
    if (!participant || !roomAdmins.has(selfId)) return;
    send({ type: "room-command", action: "promote-admin", peerId: participant.dataset.promoteAdmin });
  });
  $("#leaveRoom").addEventListener("click", () => { leaveRoom(); announce("از اتاق خارج شدی"); });
  roomBackdrop.addEventListener("click", event => { if (event.target === roomBackdrop) leaveRoom(); });
  $("#inviteBtn").addEventListener("click", async () => {
    if (location.protocol === "file:") { announce("برای ساخت لینک دعوت، سامیکا را با npm start اجرا کن"); return; }
    try {
      await navigator.clipboard.writeText(roomHashUrl(activeRoomId, activeRoomName));
      announce("لینک دعوت کپی شد؛ دوستت با بازکردنش وارد همین اتاق می‌شود");
    } catch { announce("مرورگر اجازهٔ کپی نداد؛ نشانی اتاق را از نوار آدرس کپی کن"); }
  });
  $$('[data-device]').forEach(button => button.addEventListener("click", () => toggleDevice(button.dataset.device)));
  $("[data-share]").addEventListener("click", toggleScreenShare);
  $("#reactionToolbar")?.addEventListener("click", event => {
    const button = event.target.closest("[data-reaction]");
    if (!button) return;
    const emoji = button.dataset.reaction;
    if (!send({ type: "reaction", emoji })) { announce("برای فرستادن واکنش، ابتدا به اتاق وصل شو"); return; }
    button.classList.add("reaction-sent");
    setTimeout(() => button.classList.remove("reaction-sent"), 420);
  });
  $("#gameToggle")?.addEventListener("click", event => {
    const panel = $("#gamePanel");
    panel.hidden = !panel.hidden;
    $("#chatMessages").hidden = !panel.hidden;
    $("#chatForm").hidden = !panel.hidden;
    $(".room-layout").classList.toggle("games-open", !panel.hidden);
    event.currentTarget.classList.toggle("on", !panel.hidden);
    renderGame();
  });
  $$('[data-toggle="chat"]').forEach(button => button.addEventListener("click", () => {
    chatVisible = !chatVisible;
    if (!chatVisible && !$("#gamePanel").hidden) {
      $("#gamePanel").hidden = true; $("#chatMessages").hidden = false; $("#chatForm").hidden = false;
      $(".room-layout").classList.remove("games-open"); $("#gameToggle").classList.remove("on");
    }
    $("#chatPanel").hidden = !chatVisible;
    $(".room-layout").classList.toggle("chat-hidden", !chatVisible);
    button.classList.toggle("on", chatVisible);
    announce(chatVisible ? "چت نمایش داده شد" : "چت پنهان شد");
  }));
  $("#chatForm").addEventListener("submit", event => {
    event.preventDefault();
    const input = $("#chatInput");
    const text = input.value.trim();
    if (!text) return;
    if (!selfId || !socket || socket.readyState !== WebSocket.OPEN) {
      announce("پیام ارسال نشد؛ اتصال اتاق برقرار نیست");
      return;
    }
    addChatMessage(displayName || "شما", text, true);
    if (!send({ type: "chat", text })) announce("پیام ارسال نشد؛ اتصال اتاق قطع است");
    input.value = "";
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (roomBackdrop.classList.contains("open")) leaveRoom();
      else if (createBackdrop.classList.contains("open")) hideBackdrop(createBackdrop);
      else if (joinBackdrop.classList.contains("open")) { pendingRoom = null; hideBackdrop(joinBackdrop); replaceRoomHash(""); }
    }
  });
  window.addEventListener("beforeunload", () => {
    if (socket) send({ type: "leave" });
    peerConnections.forEach(state => state.pc.close());
    localAudioTrack?.stop(); cameraTrack?.stop(); shareStream?.getTracks().forEach(track => track.stop());
  });

  const installButton = $("#installAppButton");
  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault(); deferredInstallPrompt = event;
    if (installButton) installButton.classList.add("install-ready");
  });
  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    if (installButton) installButton.classList.remove("install-ready");
    announce("سامیکا روی دستگاه نصب شد");
  });
  installButton?.addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      await deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      if (choice.outcome === "accepted") announce("درخواست نصب سامیکا پذیرفته شد");
      return;
    }
    if (window.matchMedia?.("(display-mode: standalone)").matches || navigator.standalone) {
      announce("سامیکا از قبل روی دستگاه نصب است"); return;
    }
    announce("برای نصب: در Safari دکمهٔ اشتراک‌گذاری و افزودن به صفحهٔ اصلی را بزن؛ در Chrome از منوی ⋮ گزینهٔ نصب را انتخاب کن");
  });
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(error => console.warn("Samika offline install support is unavailable", error)));
  }

  renderRecentRooms();
  updateMediaPermissions();
  const linkedRoom = readRoomHash();
  if (linkedRoom.id && /^[a-zA-Z0-9_-]{3,80}$/.test(linkedRoom.id)) setTimeout(() => openRoom(linkedRoom.name || "Samika", linkedRoom.id), 0);
})();
