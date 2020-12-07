const db = require("./db");
const express = require("express");
const workRouter = express.Router();

workRouter.use("/:minion/work", (req, res, next) => {
  const minion = db.getFromDatabaseById("minions", req.params.minion);
  if (minion) {
    req.minionId = minion.id;
    next();
  } else {
    res.sendStatus(404);
  }
});

const verifyWork = (req, res, next) => {
  const work = req.body;
  work.hours = Number(work.hours);
  if (
    typeof work.title === "string" &&
    work.title.length > 0 &&
    typeof work.description === "string" &&
    typeof work.hours === "number"
  ) {
    next();
  } else {
    res.sendStatus(400);
  }
};

const verifyId = (req, res, next) => {
  const workId = db.getFromDatabaseById("work", req.params.id).id;
  if (workId >= 0) {
    req.workId = workId;
    next();
  } else {
    res.sendStatus(404);
  }
};

workRouter.get("/:minion/work", (req, res, next) => {
  const allWork = db.getAllFromDatabase("work");
  const minionWork = allWork.filter((x) => x.minionId === req.minionId);
  res.send(minionWork);
});

workRouter.post("/:minion/work/", verifyWork, (req, res, next) => {
  const work = db.addToDatabase("work", req.body);
  res.status(201).send(work);
});

workRouter.put("/:minion/work/:id", verifyWork, verifyId, (req, res, next) => {
  const work = req.body;
  if (req.params.minion === work.minionId) {
    const updated = db.updateInstanceInDatabase("work", work);
    if (updated) {
      res.send(db.getFromDatabaseById("work", work.id));
    } else {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
});

workRouter.delete("/:minion/work/:id", verifyId, (req, res, next) => {
  const removed = db.deleteFromDatabasebyId("work", req.workId);
  if (removed) {
    res.sendStatus(204);
  } else {
    res.sendStatus(500);
  }
});

module.exports = workRouter;
