import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { messageRoutes } from "./api/routes/message.js";

const app = new Hono();

app.use("*", logger());
app.use("*", cors());

/* ここに追記 */
app.get("/health", (c) => c.json({ status: "ok", message: "Hello, World!" }));

app.route("/messages", messageRoutes);

const port = Number(process.env.PORT ?? 3000);

serve({ fetch: app.fetch, port, hostname: "0.0.0.0" }, (info) => {
  console.log(`Server running on http://localhost:${info.port}`);
});
