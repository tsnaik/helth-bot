import { create } from "../controllers/groupMember.controller.js";
import { findAll } from "../controllers/groupMember.controller.js";

import express from "express";

export function dbAppGroupMember(app) {
  var router = express.Router();
  router.post("/group-members", function (req, res) {
    create(req, res);
  });
  router.get("/group-members", function (req, res) {
    findAll(req, res);
  });
  app.use("/api", router);
}
