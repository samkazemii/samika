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
  const toast = $("#toast");
  const peerConnections = new Map();
  const peerNames = new Map();
  const remoteStreams = new Map();
  const videoTiles = new Map();
  const videoModes = new Map();
  const signalQueues = new Map();

  let activeFilter = "all";
  let selectedPrivacy = "private";
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

  try { displayName = localStorage.getItem("samika-display-name") || ""; } catch {}
  $("#displayName").value = displayName;

  function announce(message) {
    setLocalizedText(toast, message);
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
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
    const bytes = crypto.getRandomValues(new Uint8Array(8));
    return [...bytes].map(byte => alphabet[byte % alphabet.length]).join("");
  }
  function roomCodeForName(name) {
    let hash = 2166136261;
    for (let i = 0; i < name.length; i++) hash = Math.imul(hash ^ name.charCodeAt(i), 16777619);
    return `public-${(hash >>> 0).toString(36)}`;
  }
  function getDisplayName() {
    const input = $("#displayName").value.trim();
    if (input) displayName = input.slice(0, 28);
    if (!displayName) displayName = t("مهمان {{n}}", { n: Math.floor(Math.random() * 90) + 10 });
    try { localStorage.setItem("samika-display-name", displayName); } catch {}
    return displayName;
  }
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
  function activeLocalStream() {
    const stream = new MediaStream();
    if (localAudioTrack?.readyState === "live") stream.addTrack(localAudioTrack);
    const video = currentOutgoingVideo();
    if (video) stream.addTrack(video);
    return stream;
  }
  function roomHashUrl(roomId) {
    return `${location.origin}${location.pathname}${location.search}#room=${encodeURIComponent(roomId)}`;
  }
  function replaceRoomHash(roomId) {
    if (location.protocol === "file:") return;
    const suffix = roomId ? `#room=${encodeURIComponent(roomId)}` : "";
    history.replaceState(null, "", `${location.pathname}${location.search}${suffix}`);
  }
  function readRoomHash() {
    const value = location.hash.slice(1);
    if (!value.startsWith("room=")) return "";
    try { return decodeURIComponent(value.slice(5)); } catch { return ""; }
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
    root.append(avatar, video, label, audioState, audio);
    $("#videoGrid").append(root);
    tile = { root, avatar, video, name: label, audio, audioState, local };
    videoTiles.set(id, tile);
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
  function updateParticipants() {
    const strip = $("#participantStrip");
    strip.replaceChildren();
    const participants = selfId ? [{ id: selfId, name: displayName, local: true }, ...[...peerNames].map(([id, name]) => ({ id, name }))] : [];
    participants.forEach((participant, index) => {
      const item = document.createElement("div"); item.className = "participant";
      const avatar = document.createElement("i"); avatar.className = "avatar"; avatar.textContent = participant.name.trim()[0] || "؟";
      if (index % 2) avatar.style.background = "#9fd4be";
      const text = document.createElement("div");
      const name = document.createElement("span");
      if (participant.local) setLocalizedText(name, "{{name}} · شما", { name: participant.name }); else name.textContent = participant.name;
      const state = document.createElement("small"); setLocalizedText(state, participant.local ? "در این دستگاه" : "در اتاق");
      text.append(name, state); item.append(avatar, text); strip.append(item);
    });
  }
  function removePeer(peerId) {
    const state = peerConnections.get(peerId);
    if (state) state.pc.close();
    peerConnections.delete(peerId); peerNames.delete(peerId); remoteStreams.delete(peerId); signalQueues.delete(peerId);
    removeVideoTile(peerId); updateParticipants();
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
    const shareAudio = shareStream?.getAudioTracks().find(track => track.readyState === "live");
    const shareAudioTransceiver = shareAudio ? pc.addTransceiver(shareAudio, { direction: "sendrecv", streams: [shareStream] }) : null;
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
        state.pc.removeTrack(state.shareAudioTransceiver.sender);
        state.shareAudioTransceiver = null;
      }
    }
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
      announce("اشتراک صفحه در این مرورگر پشتیبانی نمی‌شود");
      return;
    }
    const button = $("[data-share]"); button.disabled = true;
    try {
      shareStream = await navigator.mediaDevices.getDisplayMedia({ video: { width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: { ideal: 30, max: 30 } }, audio: true });
      const videoTrack = shareStream.getVideoTracks()[0];
      if (!videoTrack) throw new Error("No screen video track was selected");
      videoTrack.onended = () => { if (shareStream) stopScreenShare(); };
      for (const state of peerConnections.values()) {
        await state.videoTransceiver.sender.replaceTrack(videoTrack);
        state.videoTransceiver.direction = "sendrecv";
        const audioTrack = shareStream.getAudioTracks().find(track => track.readyState === "live");
        if (audioTrack) state.shareAudioTransceiver = state.pc.addTransceiver(audioTrack, { direction: "sendrecv", streams: [shareStream] });
      }
      send({ type: "video-mode", mode: "screen" });
      button.classList.add("on"); $("span", button).textContent = t("توقف شیر");
      refreshLocalTile(); announce("انتخاب صفحه باز شد؛ تصویر صفحه به اتاق فرستاده می‌شود");
    } catch (error) {
      for (const state of peerConnections.values()) {
        const replacement = cameraTrack?.readyState === "live" && cameraTrack.enabled ? cameraTrack : null;
        await state.videoTransceiver.sender.replaceTrack(replacement).catch(() => {});
        state.videoTransceiver.direction = replacement ? "sendrecv" : "recvonly";
        if (state.shareAudioTransceiver) {
          state.pc.removeTrack(state.shareAudioTransceiver.sender);
          state.shareAudioTransceiver = null;
        }
      }
      shareStream?.getTracks().forEach(track => track.stop()); shareStream = null;
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
      activeRoomId = message.roomId;
      activeRoomName = message.roomName || activeRoomName;
      $("#activeRoomTitle").textContent = activeRoomName;
      setLocalizedText($("#chatStatus"), "{{name}} · وصل", { name: activeRoomName });
      setLocalizedText($("#roomId"), "کد {{code}}", { code: activeRoomId });
      replaceRoomHash(activeRoomId);
      setNetworkStatus("● سرور وصل است", true);
      updateParticipants();
      message.peers.forEach(peer => { peerNames.set(peer.id, peer.name); videoModes.set(peer.id, peer.videoMode || "none"); ensurePeer(peer.id, peer.name); });
      updateParticipants();
      return;
    }
    if (message.type === "peer-joined") {
      peerNames.set(message.peer.id, message.peer.name);
      videoModes.set(message.peer.id, message.peer.videoMode || "none");
      updateParticipants();
      addSystemMessage("{{name}} وارد اتاق شد", { name: message.peer.name });
      return;
    }
    if (message.type === "video-mode") {
      setRemoteVideoMode(message.peerId, message.mode);
      return;
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
    showBackdrop(createBackdrop);
    setTimeout(() => $("#roomName").focus(), 80);
  }
  function openRoom(name, roomCode = randomRoomCode()) {
    if (socket && socket.readyState !== WebSocket.CLOSED) leaveRoom(false);
    activeRoomName = name || t("اتاق سامیکا");
    activeRoomId = roomCode;
    $("#activeRoomTitle").textContent = activeRoomName;
    setLocalizedText($("#roomId"), "کد {{code}}", { code: activeRoomId });
    $("#chatMessages").replaceChildren();
    chatVisible = true;
    $("#chatPanel").hidden = false;
    $(".room-layout").classList.remove("chat-hidden");
    addSystemMessage("به اتاق سامیکا خوش اومدی! لینک را برای دوستانت بفرست 👋");
    setNetworkStatus("● در حال اتصال…", false);
    getDisplayName();
    hideBackdrop(createBackdrop);
    showBackdrop(roomBackdrop);
    connectToRoom();
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
    for (const [id, tile] of videoTiles) {
      if (tile.local) updateVideoTile(id, displayName, activeLocalStream(), true);
    }
  });

  $$('[data-open-create]').forEach(button => button.addEventListener("click", openCreate));
  $$('[data-close-create]').forEach(button => button.addEventListener("click", () => hideBackdrop(createBackdrop)));
  createBackdrop.addEventListener("click", event => { if (event.target === createBackdrop) hideBackdrop(createBackdrop); });
  $("#createForm").addEventListener("submit", event => {
    event.preventDefault();
    const roomName = $("#roomName").value.trim() || t("دورهمی دوستانه");
    getDisplayName(); openRoom(roomName); $("#roomName").value = "";
    announce(selectedPrivacy === "private" ? "اتاق خصوصی سامیکا ساخته شد" : "اتاق عمومی ساخته شد؛ اتاق‌های عمومی هنوز فهرست نمی‌شوند");
  });
  $$('input[name="privacy"]').forEach(input => input.addEventListener("change", () => {
    selectedPrivacy = input.value;
    $$(".privacy-option").forEach(option => option.classList.toggle("selected", $("input", option).checked));
  }));
  $$('[data-join]').forEach(button => button.addEventListener("click", () => openRoom(button.dataset.join, roomCodeForName(button.dataset.joinSource || button.dataset.join))));
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
  $("#leaveRoom").addEventListener("click", () => { leaveRoom(); announce("از اتاق خارج شدی"); });
  roomBackdrop.addEventListener("click", event => { if (event.target === roomBackdrop) leaveRoom(); });
  $("#inviteBtn").addEventListener("click", async () => {
    if (location.protocol === "file:") { announce("برای ساخت لینک دعوت، سامیکا را با npm start اجرا کن"); return; }
    try {
      await navigator.clipboard.writeText(roomHashUrl(activeRoomId));
      announce("لینک دعوت کپی شد؛ دوستت با بازکردنش وارد همین اتاق می‌شود");
    } catch { announce("مرورگر اجازهٔ کپی نداد؛ نشانی اتاق را از نوار آدرس کپی کن"); }
  });
  $$('[data-device]').forEach(button => button.addEventListener("click", () => toggleDevice(button.dataset.device)));
  $("[data-share]").addEventListener("click", toggleScreenShare);
  $$('[data-toggle="chat"]').forEach(button => button.addEventListener("click", () => {
    chatVisible = !chatVisible;
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
    }
  });
  window.addEventListener("beforeunload", () => {
    if (socket) send({ type: "leave" });
    peerConnections.forEach(state => state.pc.close());
    localAudioTrack?.stop(); cameraTrack?.stop(); shareStream?.getTracks().forEach(track => track.stop());
  });

  const linkedRoom = readRoomHash();
  if (linkedRoom && /^[a-zA-Z0-9_-]{3,80}$/.test(linkedRoom)) setTimeout(() => openRoom("Samika", linkedRoom), 0);
})();
