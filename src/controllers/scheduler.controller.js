import { Telegraf } from "telegraf";
import { findAllGroups, getAttendanceStat } from "../util/requests.js";

export async function processAttendances(req, res) {
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;
    let groups = JSON.parse(await findAllGroups());
    for(let i=0; i<Object.keys(groups).length; i++) {
        let group = groups[i];
        let attendances = JSON.parse(await getAttendanceStat(group.id, startDate, endDate));
        const app = new Telegraf(process.env.BOT_TOKEN);
        app.telegram.sendMessage(group.group_id, createMessage(attendances, startDate, endDate));
        console.log(`message sent for ${group.title}: ${group.group_id}`);
    }
    res.sendStatus(200);
};

function createMessage(attendances, startDate, endDate) {
    let res = "🗒️ Attendance Report " + formatReportDate(startDate, endDate) + " 🗒\n\n";
    for(let i=0; i<attendances.length; i++) {
        let attendance = attendances[i];
        let userId = attendance.user_id;
        let first_name = attendance.first_name;
        let count = attendance.count;
        res += "🎉 Kudos to " + capitalizeFirstLetter(first_name) + " for exercising " + count + " times\n"; // should make a user name instead of the id
    }
    return res;
}

function formatReportDate(startDate, endDate) {
    if (startDate === endDate) {
        return startDate;
    }
    return "(" + startDate + ") - (" + endDate + ")";
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
