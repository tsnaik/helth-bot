import { create } from "../controllers/group.controller.js";
import { findAll } from "../controllers/group.controller.js";
import { findByID } from "../controllers/group.controller.js";
import { findAllUsers } from "../controllers/group.controller.js";

import express from "express";

export function dbAppGroup(app) {
  var router = express.Router();
  router.post("/groups", function (req, res) {
    create(req, res);
  });
  router.get("/groups", function (req, res) {
    findAll(req, res);
  });
  router.get("/groups/:groupID", function (req, res) {
    findByID(req, res);
  });
  router.get("/groups/:groupID/users", function (req, res) {
    findAllUsers(req, res);
  });
  app.use("/api", router);
}
