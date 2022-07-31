import { create } from "../controllers/user.controller.js";
import { findAll } from "../controllers/user.controller.js";
import { findByID } from "../controllers/user.controller.js";

import express from "express";

export function dbAppUser(app) {
  var router = express.Router();
  router.post("/users", function (req, res) {
    create(req, res);
  });

  router.get("/users", function (req, res) {
    findAll(req, res);
  });

  router.get("/users/:userID", function (req, res) {
    findByID(req, res);
  });

  app.use("/api", router);
}
