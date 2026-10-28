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

function send(socket, payload) {
  if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(payload));
}

function cleanText(value, maxLength, fallback = "") {
  if (typeof value !== "string") return fallback;
  const text = value.replace(/[\u0000-\u001f\u007f]/g, "").trim();
  return text.slice(0, maxLength) || fallback;
}

function getRoom(roomId) {
  let room = rooms.get(roomId);
  if (!room) {
    room = { name: "اتاق سامیکا", peers: new Map() };
    rooms.set(roomId, room);
  }
  return room;
}

function removePeer(socket) {
  const peer = socket.peer;
  if (!peer) return;
  const room = rooms.get(peer.roomId);
  if (room) {
    room.peers.delete(peer.id);
    for (const other of room.peers.values()) send(other.socket, { type: "peer-left", peerId: peer.id });
    if (room.peers.size === 0) rooms.delete(peer.roomId);
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
  if (pathname === "/app.js") {
    fs.readFile(path.join(__dirname, "app.js"), (error, data) => {
      if (error) {
        response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
        response.end("Samika could not load its app code.");
        return;
      }
      response.writeHead(200, {
        "content-type": "text/javascript; charset=utf-8",
        "cache-control": "no-cache",
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
    try { sameOrigin = new URL(origin).host === request.headers.host; }
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
      const room = getRoom(roomId);
      if (room.peers.size >= maxRoomSize) {
        send(socket, { type: "error", message: `این نسخه برای اتاق‌های کوچک تا ${maxRoomSize} نفر تنظیم شده است.` });
        if (room.peers.size === 0) rooms.delete(roomId);
        return;
      }
      const name = cleanText(message.name, 28, "مهمان");
      const requestedRoomName = cleanText(message.roomName, 48, "اتاق سامیکا");
      if (room.peers.size === 0) room.name = requestedRoomName;
      const id = randomUUID();
      const peer = { id, roomId, name, videoMode: "none", socket };
      const peers = [...room.peers.values()].map(existing => ({ id: existing.id, name: existing.name, videoMode: existing.videoMode }));
      socket.peer = peer;
      room.peers.set(id, peer);
      send(socket, { type: "joined", selfId: id, roomId, roomName: room.name, peers });
      for (const peer of room.peers.values()) {
        if (peer.id !== id) send(peer.socket, { type: "peer-joined", peer: { id, name, videoMode: "none" } });
      }
      return;
    }

    const peer = socket.peer;
    if (!peer) {
      send(socket, { type: "error", message: "ابتدا وارد یک اتاق شوید." });
      return;
    }
    const room = rooms.get(peer.roomId);
    if (!room) return;

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
wss.on("close", () => clearInterval(heartbeatTimer));

server.listen(port, host, () => {
  console.log(`Samika is listening on http://${host}:${port}`);
});

process.on("SIGTERM", () => {
  clearInterval(heartbeatTimer);
  for (const socket of wss.clients) socket.close(1001, "Server shutting down");
  server.close(() => process.exit(0));
});
