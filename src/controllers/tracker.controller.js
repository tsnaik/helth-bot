import commandMap from "./commands/commandMap.js";

export function tracker(bot) {
  console.log("commands", commandMap);
  Object.entries(commandMap).forEach((entry) => {
    bot.command(entry[0], entry[1]);
  });

  bot.launch();
}
