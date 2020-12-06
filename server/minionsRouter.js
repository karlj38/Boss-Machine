const db = require("./db");
const express = require("express");
const minionsRouter = express.Router();

minionsRouter.use(express.json());

minionsRouter.use("/:id", (req, res, next) => {
  const minion = db.getFromDatabaseById("minions", req.params.id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.sendStatus(404);
  }
});

minionsRouter.get("/", (req, res, next) => {
  const allMinions = db.getAllFromDatabase("minions");
  res.send(allMinions);
});

minionsRouter.post("/", (req, res, next) => {
  const minion = req.body;
  if (
    typeof minion.name === "string" &&
    typeof minion.title === "string" &&
    typeof minion.salary === "string" &&
    typeof minion.weaknesses === "string"
  ) {
    const added = db.addToDatabase("minions", minion);
    if (added) {
      res.send(added);
    } else {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
});

minionsRouter.get("/:id", (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put("/:id", (req, res, next) => {
  const minion = req.body;
  // console.log(req.minion);
  // console.log(typeof req.body.number);
  // const updated = db.updateInstanceInDatabase("minions", req.body);
  // if (
  // typeof req.body.name === "string" &&
  // typeof req.body.title === "string" &&
  // typeof req.body.salary === "number"
  // ) {
  const updated = db.updateInstanceInDatabase("minions", minion);
  if (updated) {
    // console.log("updated");
    res.send(db.getFromDatabaseById("minions", minion.id));
  } else {
    res.sendStatus(500);
  }
  // } else {
  // res.sendStatus(400);
  // }
});

minionsRouter.delete("/:id", (req, res, next) => {
  console.log(req.minion);
  const removed = db.deleteFromDatabasebyId("minions", req.minion.id);
  if (removed) {
    console.log("deleted");
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

module.exports = minionsRouter;
