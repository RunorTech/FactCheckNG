// lib/socket.ts
import { Server as IOServer } from "socket.io";
let io = null;

export const initIO = (server) => {

  if (!io) {
    io = new IOServer(server, {
      path: "/socket.io",
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  }

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
