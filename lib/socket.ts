import { io, Socket } from "socket.io-client";

export async function emitWsEvent(event: string, timestamp: string) {
  // Create one short-lived socket instance
  const socket: Socket = io("https://ws-socket-production.up.railway.app", {
    path: "/socket.io",
    transports: ["websocket", "polling"],
  });

  // Wait for connection
  await new Promise<void>((resolve, reject) => {
    socket.on("connect", () => resolve());
    socket.on("connect_error", (err) => reject(err));
  });

  // Emit the event
  socket.emit(event, timestamp);

  // Disconnect
  socket.disconnect();
}