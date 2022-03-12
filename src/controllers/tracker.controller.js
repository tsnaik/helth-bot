import commandMap from "./commands/commandMap.js";

export function tracker(bot) {
  console.log("commands", commandMap);
  Object.entries(commandMap).forEach((entry) => {
    console.log(entry[0], entry[1]);
    console.log(typeof entry[0]);

    bot.command(entry[0], entry[1]);
  });

  bot.launch();
}
