import dotenv from "dotenv";
dotenv.config();

import { Telegraf } from "telegraf";
import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Yes, the bot server is running at this address!");
});

app.listen(port, () => {
  console.log(`Helth God listening on port ${port}`);
});

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  bot.stop("SIGINT");
  process.exit(0);
});
process.once("SIGTERM", () => bot.stop("SIGTERM"));
