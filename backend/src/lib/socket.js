import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const userSocketMap = {};

export function getUserSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log(`A user connected with socket id${socket.id}`);
  const { userId } = socket.handshake.query;
  if (userId) userSocketMap[userId] = socket.id;

  socket.on("disconnect", () => {
    console.log(`A user disconnected with socket id${socket.id}`);
    delete userSocketMap[userId];
  });
});

export { io, app, server };
