import express from "express";
import { processAttendances } from "../controllers/scheduler.controller.js";

export function appScheduler(app) {
  var router = express.Router();

  router.get("/scheduler", function (req, res) {
    processAttendances(req, res);
  });

  app.use("/api", router);
}
