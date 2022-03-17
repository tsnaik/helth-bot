import dotenv from "dotenv";
import { Telegraf } from "telegraf";
import express from "express";

import { tracker } from "./controllers/tracker.controller.js";

const app = express();
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

let isWebhookMode = false;
if (process.env.WEBHOOK_DOMAIN != null) {
  console.log(
    "webhook domain is set. probably a production env. going webhook mode"
  );
  isWebhookMode = true;
  const secretPath = `/telegraf/${bot.secretPathComponent()}`;
  bot.telegram.setWebhook(`https://${process.env.WEBHOOK_DOMAIN}${secretPath}`);
  app.use(bot.webhookCallback(secretPath));
}

tracker(bot, isWebhookMode);

app.get("/health", (req, res) => {
  // health, not helth ;)
  res.send(
    "Yes, the bot server is running at this address! We can add more diagnostics as we go."
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Helth God listening on port ${port}`);
});

// Enable graceful stop
process.once("SIGINT", () => {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  bot.stop("SIGINT");
  process.exit(0);
});
process.once("SIGTERM", () => bot.stop("SIGTERM"));
