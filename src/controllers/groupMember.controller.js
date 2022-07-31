import { ormdb as db } from "../models/index.js";

const groupMember = db.groupMembers;
const Op = db.Sequelize.Op;

export function create(req, res) {
  const obj = {
    user_id: req.body.user_id,
    group_id: req.body.group_id,
  };

  groupMember
    .create(obj)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the group member.",
      });
    });
}

export function findAll(req, res) {
  groupMember
    .findAll({
      attributes: ["user_id", "group_id"],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving group members.",
      });
    });
}

export const groupMembers = groupMember;
