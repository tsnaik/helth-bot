const SAMPLE_MESSAGE = "Dummy response to a checkin \\.";
export default (ctx) => ctx.reply(SAMPLE_MESSAGE, { parse_mode: "MarkdownV2" });
