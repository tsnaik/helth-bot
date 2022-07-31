import { ormdb as db } from "../models/index.js";

const User = db.users;
const Op = db.Sequelize.Op;

export function create(req, res) {
  const user = {
    user_id: req.body.id,
    is_bot: req.body.is_bot,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    language_code: req.body.language_code,
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
}

export function findAll(req, res) {
  User.findAll({
    attributes: [
      "id",
      "user_id",
      "is_bot",
      "first_name",
      "last_name",
      "username",
      "language_code",
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
}

export function findByID(req, res) {
  User.findOne({
    where: {
      id: req.params.userID,
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
        message: err.message || "Some error occured while retrieving user.",
      });
    });
}

export const users = User;
