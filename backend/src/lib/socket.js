import express from "express";
import http from "http";
import { Server } from "socket.io";
import User from "../models/user.model.js";

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

io.on("connection", async (socket) => {
  const { userId } = socket.handshake.query;
  if (userId) {
    userSocketMap[userId] = socket.id;
    io.emit("onlineusers", Object.keys(userSocketMap));
  }
  const user = await User.findById(userId);
  const groups = user.groups;
  if (groups) {
    groups.forEach((group) => {
      console.log("Here for", user.username, group);
      socket.join(group.toString());
    });
  }
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("onlineusers", Object.keys(userSocketMap));
  });

  socket.on("typing", (receiverId) => {
    const receiverSocketId = getUserSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", userId);
    }
  });

  socket.on("stop-typing", (receiverId) => {
    const receiverSocketId = getUserSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("stop-typing", userId);
    }
  });
});

export { io, app, server };
