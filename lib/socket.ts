import { io } from "socket.io-client";

export const ws = io("https://ws-socket-production.up.railway.app", {
  transports: ["websocket"]
});
