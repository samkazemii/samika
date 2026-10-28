"use strict";

const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");
const { randomUUID } = require("node:crypto");
const { WebSocketServer, WebSocket } = require("ws");

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";
const indexPath = path.join(__dirname, "index.html");
const rooms = new Map();
const maxRoomSize = 8;
const roomRetentionMs = 7 * 24 * 60 * 60 * 1000;
const allowedOrigins = new Set([
  "https://samkazemii.github.io",
  ...(process.env.SAMIKA_ALLOWED_ORIGINS || "").split(",").map(origin => origin.trim()).filter(Boolean),
]);

function send(socket, payload) {
  if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(payload));
}

function cleanText(value, maxLength, fallback = "") {
  if (typeof value !== "string") return fallback;
  const text = value.replace(/[\u0000-\u001f\u007f]/g, "").trim();
  return text.slice(0, maxLength) || fallback;
}

function parseSharedMedia(value) {
  if (typeof value !== "string" || value.length > 2000) return null;
  let url;
  try { url = new URL(value); } catch { return null; }
  if (url.protocol !== "https:" || url.username || url.password) return null;
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (["youtube.com", "m.youtube.com", "music.youtube.com", "youtube-nocookie.com", "youtu.be"].includes(host)) {
    const match = host === "youtu.be"
      ? url.pathname.split("/").filter(Boolean)[0]
      : (url.searchParams.get("v") || url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1]);
    if (!match || !/^[a-zA-Z0-9_-]{11}$/.test(match)) return null;
    return { url: `https://www.youtube.com/watch?v=${match}`, kind: "youtube", videoId: match };
  }
  if (/\.(mp4|m4v|webm|ogv|mov|m3u8)$/i.test(url.pathname)) return { url: url.href, kind: "direct" };
  return null;
}

function getRoom(roomId) {
  pruneEmptyRooms();
  let room = rooms.get(roomId);
  if (!room) {
    room = { name: "اتاق سامیکا", hasName: false, peers: new Map(), media: null, game: null, lastActiveAt: Date.now() };
    rooms.set(roomId, room);
  }
  return room;
}

function pruneEmptyRooms(now = Date.now()) {
  for (const [roomId, room] of rooms) {
    if (room.peers.size === 0 && now - room.lastActiveAt > roomRetentionMs) rooms.delete(roomId);
  }
}

function publicGame(room) {
  if (!room.game) return null;
  const { secret, ...visible } = room.game;
  if (visible.type === "tic") {
    visible.players = room.game.players.map(id => id ? { id, name: room.peers.get(id)?.name || "" } : null);
  }
  if (visible.type === "tic") visible.turnName = room.peers.get(room.game.turn)?.name || "";
  return visible;
}

function broadcastGame(room) {
  const payload = { type: "game-state", game: publicGame(room) };
  for (const peer of room.peers.values()) send(peer.socket, payload);
}

function broadcastRoomRoles(room, promotedPeerId = "") {
  const adminIds = [...room.peers.values()].filter(peer => peer.isAdmin).map(peer => peer.id);
  const promoted = promotedPeerId ? room.peers.get(promotedPeerId) : null;
  const payload = {
    type: "room-roles",
    adminIds,
    promotedPeerId: promoted?.id || "",
    promotedName: promoted?.name || "",
  };
  for (const peer of room.peers.values()) send(peer.socket, payload);
}

const winningLines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function ticWinner(board) {
  for (const [a, b, c] of winningLines) if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  return board.every(Boolean) ? "draw" : "";
}

function removePeer(socket) {
  const peer = socket.peer;
  if (!peer) return;
  const room = rooms.get(peer.roomId);
  if (room) {
    room.peers.delete(peer.id);
    room.lastActiveAt = Date.now();
    for (const other of room.peers.values()) send(other.socket, { type: "peer-left", peerId: peer.id });
    if (peer.isAdmin && ![...room.peers.values()].some(member => member.isAdmin)) {
      const nextAdmin = room.peers.values().next().value;
      if (nextAdmin) nextAdmin.isAdmin = true;
    }
    if (peer.isAdmin && room.peers.size) broadcastRoomRoles(room);
    if (room.game?.type === "tic" && room.game.players.includes(peer.id)) {
      room.game = null;
      broadcastGame(room);
    }
  }
  socket.peer = null;
}

const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host || "localhost"}`).pathname;
  if (pathname === "/health") {
    response.writeHead(200, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
    response.end(JSON.stringify({ ok: true, service: "samika-signaling", rooms: rooms.size }));
    return;
  }
  const staticAssets = {
    "/app.js": "text/javascript; charset=utf-8",
    "/i18n.js": "text/javascript; charset=utf-8",
    "/manifest.webmanifest": "application/manifest+json; charset=utf-8",
    "/service-worker.js": "text/javascript; charset=utf-8",
    "/icon-192.png": "image/png",
    "/icon-512.png": "image/png",
    "/apple-touch-icon.png": "image/png",
  };
  if (Object.hasOwn(staticAssets, pathname)) {
    const assetPath = path.join(__dirname, pathname.slice(1));
    fs.readFile(assetPath, (error, data) => {
      if (error) {
        response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
        response.end("Samika could not load its JavaScript asset.");
        return;
      }
      response.writeHead(200, {
        "content-type": staticAssets[pathname],
        "cache-control": pathname === "/service-worker.js" ? "no-cache" : "public, max-age=3600",
        ...(pathname === "/service-worker.js" ? { "service-worker-allowed": "/" } : {}),
        "x-content-type-options": "nosniff",
      });
      response.end(data);
    });
    return;
  }
  if (pathname !== "/" && pathname !== "/index.html") {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }
  fs.readFile(indexPath, (error, data) => {
    if (error) {
      response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      response.end("Samika could not load its web page.");
      return;
    }
    response.writeHead(200, {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-cache",
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
    });
    response.end(data);
  });
});

const wss = new WebSocketServer({ noServer: true, maxPayload: 64 * 1024 });

server.on("upgrade", (request, socket, head) => {
  const pathname = new URL(request.url, `http://${request.headers.host || "localhost"}`).pathname;
  const origin = request.headers.origin;
  let sameOrigin = true;
  if (origin) {
    try {
      const normalizedOrigin = new URL(origin).origin;
      sameOrigin = new URL(origin).host === request.headers.host || allowedOrigins.has(normalizedOrigin);
    }
    catch { sameOrigin = false; }
  }
  if (pathname !== "/signal" || !sameOrigin) {
    socket.destroy();
    return;
  }
  wss.handleUpgrade(request, socket, head, webSocket => wss.emit("connection", webSocket, request));
});

wss.on("connection", socket => {
  socket.isAlive = true;
  socket.on("pong", () => { socket.isAlive = true; });
  socket.on("message", raw => {
    let message;
    try {
      message = JSON.parse(raw.toString());
    } catch {
      send(socket, { type: "error", message: "پیام نامعتبر بود." });
      return;
    }

    if (message.type === "join") {
      if (socket.peer) {
        send(socket, { type: "error", message: "این اتصال قبلاً وارد یک اتاق شده است." });
        return;
      }
      const roomId = typeof message.roomId === "string" ? message.roomId.trim().slice(0, 80) : "";
      if (!/^[a-zA-Z0-9_-]{3,80}$/.test(roomId)) {
        send(socket, { type: "error", message: "کد اتاق معتبر نیست." });
        return;
      }
      const name = cleanText(message.name, 28);
      if (!name) {
        send(socket, { type: "error", message: "نام کاربری اجباری است." });
        return;
      }
      const room = getRoom(roomId);
      if (room.peers.size >= maxRoomSize) {
        send(socket, { type: "error", message: `این نسخه برای اتاق‌های کوچک تا ${maxRoomSize} نفر تنظیم شده است.` });
        return;
      }
      const requestedRoomName = cleanText(message.roomName, 48, "اتاق سامیکا");
      if (!room.hasName) { room.name = requestedRoomName; room.hasName = true; }
      room.lastActiveAt = Date.now();
      const id = randomUUID();
      const isAdmin = ![...room.peers.values()].some(existing => existing.isAdmin);
      const peer = { id, roomId, name, videoMode: "none", isAdmin, socket };
      const peers = [...room.peers.values()].map(existing => ({ id: existing.id, name: existing.name, videoMode: existing.videoMode, isAdmin: existing.isAdmin }));
      socket.peer = peer;
      room.peers.set(id, peer);
      if (room.game?.type === "tic" && room.game.players[1] === null && room.game.players[0] !== id) room.game.players[1] = id;
      const adminIds = [...room.peers.values()].filter(member => member.isAdmin).map(member => member.id);
      send(socket, { type: "joined", selfId: id, roomId, roomName: room.name, peers, adminIds, media: room.media, game: publicGame(room), serverNow: Date.now() });
      for (const peer of room.peers.values()) {
        if (peer.id !== id) send(peer.socket, { type: "peer-joined", peer: { id, name, videoMode: "none", isAdmin } });
      }
      if (room.game?.type === "tic" && room.game.players[1] === id) broadcastGame(room);
      return;
    }

    const peer = socket.peer;
    if (!peer) {
      send(socket, { type: "error", message: "ابتدا وارد یک اتاق شوید." });
      return;
    }
    const room = rooms.get(peer.roomId);
    if (!room) return;
    room.lastActiveAt = Date.now();

    if (message.type === "signal") {
      const target = room.peers.get(String(message.to || ""));
      if (!target) return;
      const forwarded = { type: "signal", from: peer.id, name: peer.name };
      if (message.description && typeof message.description === "object") forwarded.description = message.description;
      if (message.candidate && typeof message.candidate === "object") forwarded.candidate = message.candidate;
      send(target.socket, forwarded);
      return;
    }

    if (message.type === "chat") {
      const text = cleanText(message.text, 250);
      if (!text) return;
      for (const other of room.peers.values()) {
        if (other.id !== peer.id) send(other.socket, { type: "chat", peerId: peer.id, name: peer.name, text, at: Date.now() });
      }
      return;
    }

    if (message.type === "video-mode") {
      peer.videoMode = message.mode === "screen" || message.mode === "camera" ? message.mode : "none";
      for (const other of room.peers.values()) {
        if (other.id !== peer.id) send(other.socket, { type: "video-mode", peerId: peer.id, mode: peer.videoMode });
      }
      return;
    }

    if (message.type === "room-command") {
      if (message.action !== "promote-admin") return;
      if (!peer.isAdmin) {
        send(socket, { type: "error", code: "admin-required", message: "تنها ادمین‌های اتاق می‌توانند مدیر اضافه کنند." });
        return;
      }
      const targetId = typeof message.peerId === "string" ? message.peerId : "";
      const target = room.peers.get(targetId);
      if (!target || target.id === peer.id || target.isAdmin) return;
      target.isAdmin = true;
      broadcastRoomRoles(room, target.id);
      return;
    }

    if (message.type === "reaction") {
      const emoji = typeof message.emoji === "string" && ["😂", "😭", "❤️", "😮", "🔥", "👏"].includes(message.emoji) ? message.emoji : "";
      if (!emoji) return;
      const payload = { type: "reaction", peerId: peer.id, name: peer.name, emoji, at: Date.now() };
      for (const other of room.peers.values()) send(other.socket, payload);
      return;
    }

    if (message.type === "game-command") {
      const action = message.action;
      if (action === "start") {
        const mode = message.mode;
        if (mode === "tic") {
          const second = [...room.peers.keys()].find(id => id !== peer.id) || null;
          room.game = { type: "tic", board: Array(9).fill(""), players: [peer.id, second], turn: peer.id, winner: "", active: true };
        } else if (mode === "guess") {
          room.game = { type: "guess", secret: 1 + Math.floor(Math.random() * 50), tries: 0, lastGuess: null, hint: "", winner: "", active: true };
        } else if (mode === "challenge") {
          room.game = { type: "challenge", promptIndex: Math.floor(Math.random() * 6), by: peer.name, active: true };
        } else return;
        broadcastGame(room);
        return;
      }
      if (action === "move" && room.game?.type === "tic" && room.game.active) {
        const game = room.game;
        const index = Number(message.index);
        const seat = game.players.indexOf(peer.id);
        if (seat < 0 || !game.players[1] || game.turn !== peer.id || !Number.isInteger(index) || index < 0 || index > 8 || game.board[index]) return;
        game.board[index] = seat === 0 ? "X" : "O";
        const winner = ticWinner(game.board);
        if (winner) { game.winner = winner; game.active = false; }
        else game.turn = game.players[1 - seat] || peer.id;
        broadcastGame(room);
        return;
      }
      if (action === "guess" && room.game?.type === "guess" && room.game.active) {
        const value = Number(message.value);
        if (!Number.isInteger(value) || value < 1 || value > 50) return;
        const game = room.game;
        game.tries++;
        game.lastGuess = { name: peer.name, value };
        if (value === game.secret) { game.winner = peer.name; game.active = false; game.hint = "correct"; }
        else game.hint = value > game.secret ? "high" : "low";
        broadcastGame(room);
        return;
      }
      if (action === "next-challenge" && room.game?.type === "challenge") {
        const index = Number(message.promptIndex);
        if (!Number.isInteger(index) || index < 0 || index > 5) return;
        room.game = { type: "challenge", promptIndex: index, by: peer.name, active: true };
        broadcastGame(room);
        return;
      }
      return;
    }

    if (message.type === "media-command") {
      if (!peer.isAdmin) {
        send(socket, { type: "error", code: "admin-required", message: "تنها ادمین‌های اتاق می‌توانند ویدئو را کنترل کنند." });
        return;
      }
      const action = message.action;
      if (action === "clear") room.media = null;
      else if (action === "load") {
        const parsed = parseSharedMedia(message.url);
        if (!parsed) {
          send(socket, { type: "error", message: "لینک پشتیبانی نمی‌شود؛ لینک YouTube یا مستقیم MP4/WebM بده." });
          return;
        }
        room.media = { ...parsed, playing: true, currentTime: 0, updatedAt: Date.now() };
      } else if (["play", "pause", "seek"].includes(action) && room.media) {
        const seconds = Number(message.currentTime);
        if (!Number.isFinite(seconds) || seconds < 0 || seconds > 24 * 60 * 60) return;
        room.media = {
          ...room.media,
          currentTime: seconds,
          playing: action === "play" ? true : action === "pause" ? false : room.media.playing,
          updatedAt: Date.now(),
        };
      } else return;
      const payload = { type: "media-state", media: room.media, serverNow: Date.now() };
      for (const other of room.peers.values()) send(other.socket, payload);
      return;
    }

    if (message.type === "leave") removePeer(socket);
  });

  socket.on("close", () => removePeer(socket));
  socket.on("error", () => removePeer(socket));
});

const heartbeatTimer = setInterval(() => {
  for (const socket of wss.clients) {
    if (!socket.isAlive) { socket.terminate(); continue; }
    socket.isAlive = false;
    socket.ping();
  }
}, 30_000);
const roomCleanupTimer = setInterval(() => pruneEmptyRooms(), 60 * 60 * 1000);
roomCleanupTimer.unref?.();
wss.on("close", () => clearInterval(heartbeatTimer));

server.listen(port, host, () => {
  console.log(`Samika is listening on http://${host}:${port}`);
});

process.on("SIGTERM", () => {
  clearInterval(heartbeatTimer);
  clearInterval(roomCleanupTimer);
  for (const socket of wss.clients) socket.close(1001, "Server shutting down");
  server.close(() => process.exit(0));
});
