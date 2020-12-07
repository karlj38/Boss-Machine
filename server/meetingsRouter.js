const db = require("./db");
const express = require("express");
const meetingsRouter = express.Router();

meetingsRouter.get("/", (req, res, next) => {
  const allMeetings = db.getAllFromDatabase("meetings");
  res.send(allMeetings);
});

meetingsRouter.post("/", (req, res, next) => {
  const meeting = db.createMeeting();
  db.addToDatabase("meetings", meeting);
  res.status(201).send(meeting);
});

meetingsRouter.delete("/", (req, res, next) => {
  db.deleteAllFromDatabase("meetings");
  res.sendStatus(204);
});

module.exports = meetingsRouter;
