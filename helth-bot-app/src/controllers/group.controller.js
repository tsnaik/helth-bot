import { ormdb as db } from "../models/index.js";

const group = db.groups;
const Op = db.Sequelize.Op;

export function create(req, res) {
  const obj = {
    group_id: req.body.id,
    title: req.body.title,
    type: req.body.type,
    all_members_admin: req.body.all_members_are_administrators,
  };

  group
    .create(obj)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the group.",
      });
    });
}

export function findAll(req, res) {
  group
    .findAll({
      attributes: ["id", "group_id", "title", "type", "all_members_admin"],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving groups.",
      });
    });
}

export function findAllUsers(req, res) {
  group
    .findAll({
      include: [
        {
          model: db.users,
          required: true,
        },
      ],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving groups.",
      });
    });
}

export function findByID(req, res) {
  group
    .findOne({
      where: {
        id: req.params.groupID,
      },
    })
    .then((data) => {
      if (!data) {
        res.status(404);
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving groups.",
      });
    });
}

export const groups = group;
