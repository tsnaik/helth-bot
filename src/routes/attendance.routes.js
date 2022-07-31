import { create } from "../controllers/attendance.controller.js";
import { findAll } from "../controllers/attendance.controller.js";
import { calculatePoints } from "../controllers/attendance.controller.js";

import express from "express";

export function dbAppAttendance(app) {
  var router = express.Router();
  router.post("/attendances", function (req, res) {
    create(req, res);
  });
  router.get("/attendances", function (req, res) {
    findAll(req, res);
  });
  router.get("/attendances/stat/points", function (req, res) {
    calculatePoints(req, res);
  });
  app.use("/api", router);
}
