const db = require("./db");
const express = require("express");
const ideasRouter = express.Router();
const checkIdea = require("./checkMillionDollarIdea");

const verifyId = (req, res, next) => {
  const idea = db.getFromDatabaseById("ideas", req.params.id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.sendStatus(404);
  }
};

ideasRouter.get("/", (req, res, next) => {
  const allIdeas = db.getAllFromDatabase("ideas");
  res.send(allIdeas);
});

ideasRouter.post("/", checkIdea, (req, res, next) => {
  const idea = req.body;
  const added = db.addToDatabase("ideas", idea);
  if (added) {
    res.status(201).send(added);
  } else {
    res.sendStatus(500);
  }
});

ideasRouter.get("/:id", verifyId, (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put("/:id", verifyId, checkIdea, (req, res, next) => {
  const idea = req.body;
  const updated = db.updateInstanceInDatabase("ideas", idea);
  if (updated) {
    res.send(db.getFromDatabaseById("ideas", idea.id));
  }
});

ideasRouter.delete("/:id", verifyId, (req, res, next) => {
  const removed = db.deleteFromDatabasebyId("ideas", req.idea.id);
  if (removed) {
    res.sendStatus(204);
  } else {
    res.sendStatus(500);
  }
});

module.exports = ideasRouter;
