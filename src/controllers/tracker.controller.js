import commandMap from "./commands/commandMap.js";

export function tracker(bot, isWebhookMode) {
  console.log("commands", commandMap);
  Object.entries(commandMap).forEach((entry) => {
    bot.command(entry[0], entry[1]);
  });

  if (!isWebhookMode) {
    bot.launch();
  }
}
