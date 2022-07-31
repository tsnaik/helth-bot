import help from "./help.command.js";
import checkin from "./checkin.command.js";

export default {
  help,
  helthtoday: checkin, // key of the export is the command name: ie the user will call /helthtoday
};
