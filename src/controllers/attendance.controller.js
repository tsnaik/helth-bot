import { ormdb as db } from "../models/index.js";
import { Sequelize } from "sequelize";

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

export function calculatePoints(req, res) {
  attendance
    .findAll({
      group: ["group_id", "user_id"],
      attributes: ['user_id', [Sequelize.fn("count", Sequelize.col("user_id")), "count"]],
      where: {
        [Op.and]: [
          { group_id: req.query.groupID },
          { date: { [Op.between]: [req.query.startDate, req.query.endDate] } },
        ],
      }
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

export const attendances = attendance;
