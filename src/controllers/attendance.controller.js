import { ormdb as db } from "../models/index.js";

const attendance = db.attendances;
const Op = db.Sequelize.Op;

export function create(req, res) {
  const obj = {
    message_id: req.body.message_id,
    text: req.body.text,
    user_id: req.body.user_id,
    group_id: req.body.group_id,
    date: new Date(req.body.date),
  };

  attendance
    .create(obj)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the attendance.",
      });
    });
}

export function findAll(req, res) {
  attendance
    .findAll({
      attributes: ["message_id", "text", "user_id", "group_id", "date"],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving attendances.",
      });
    });
}

export async function calculatePoints(req, res) {
  let groupID = req.query.groupID;
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;
  const [results, metadata] = await db.sequelize
  .query("SELECT a.user_id, u.first_name, count(a.user_id) as count FROM attendances AS a INNER JOIN users AS u ON a.user_id = u.id WHERE a.group_id=" + groupID + 
  " AND a.date between '" + startDate + "'::DATE AND '" + endDate + "'::DATE GROUP BY a.group_id, a.user_id, u.first_name");
  res.send(results);
}

export const attendances = attendance;
