// server.js
import { createServer } from "http";
import next from "next";
import { initIO } from "./lib/socket.js";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  initIO(server);

  server.listen(port, () => {
    console.log(`> Server ready on http://localhost:${port}`);
  });
});
