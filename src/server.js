import dotenv from "dotenv";
dotenv.config();

import { Telegraf } from "telegraf";
import express from "express";

import { tracker } from "./controllers/tracker.controller.js";

const app = express();
const port = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  // health, not helth ;)
  res.send(
    "Yes, the bot server is running at this address! We can add more diagnostics as we go."
  );
});

app.listen(port, () => {
  console.log(`Helth God listening on port ${port}`);
});

const bot = new Telegraf(process.env.BOT_TOKEN);
tracker(bot);

// Enable graceful stop
process.once("SIGINT", () => {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  bot.stop("SIGINT");
  process.exit(0);
});
process.once("SIGTERM", () => bot.stop("SIGTERM"));
