import chrono from "chrono-node";

const allowList = ["today", "yesterday"];

const processSubCommand = (subCommand) => {
  if (!allowList.includes(subCommand)) {
    throw new Error(`Invalid value after the command: ${subCommand}`);
  }
  const date = chrono.parseDate(subCommand);
  console.log(`logged date: ${date}`);
  // TODO make some calls to DB to add entry.
  return true;
};

export default (ctx) => {
  console.log(ctx.message);
  const entity = ctx.message.entities.find(
    (value) => value.type === "bot_command"
  );
  const appendedText = ctx.message.text.substring(
    entity.length - entity.offset + 1
  );
  console.log(appendedText);

  if (!appendedText) {
    ctx.reply(
      `Please provide a time after ${
        ctx.message.text
      }. Possible options are: ${allowList.join(
        ", "
      )}. \n\nExample: Send "/helth today" to record today's activity.`
    );
    return;
  }

  try {
    const isOk = processSubCommand(appendedText);
    if (isOk) {
      ctx.reply(
        `${ctx.message.from.first_name}, I have recorded your entry for ${appendedText}.`
      );
    }
  } catch (error) {
    ctx.reply(error.message);
  }
};
