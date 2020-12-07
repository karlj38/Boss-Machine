const db = require("./db");
const express = require("express");
const minionsRouter = express.Router();

const verifyId = (req, res, next) => {
  const minion = db.getFromDatabaseById("minions", req.params.id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.sendStatus(404);
  }
};

minionsRouter.get("/", (req, res, next) => {
  const allMinions = db.getAllFromDatabase("minions");
  res.send(allMinions);
});

minionsRouter.post("/", (req, res, next) => {
  const minion = req.body;
  minion.salary = Number(minion.salary);
  if (
    typeof minion.name === "string" &&
    typeof minion.title === "string" &&
    typeof minion.salary === "number" &&
    typeof minion.weaknesses === "string"
  ) {
    const added = db.addToDatabase("minions", minion);
    if (added) {
      res.status(201).send(added);
    } else {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
});

minionsRouter.get("/:id", verifyId, (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put("/:id", verifyId, (req, res, next) => {
  const minion = req.body;
  const updated = db.updateInstanceInDatabase("minions", minion);
  if (updated) {
    res.send(db.getFromDatabaseById("minions", minion.id));
  } else {
    res.sendStatus(500);
  }
});

minionsRouter.delete("/:id", verifyId, (req, res, next) => {
  const removed = db.deleteFromDatabasebyId("minions", req.minion.id);
  if (removed) {
    res.sendStatus(204);
  } else {
    res.sendStatus(500);
  }
});

module.exports = minionsRouter;
