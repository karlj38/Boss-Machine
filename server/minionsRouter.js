const db = require("./db");
const express = require("express");
const minionsRouter = express.Router();

minionsRouter.get("/", (req, res, next) => {
  const allMinions = db.getAllFromDatabase("minions");
  res.send(allMinions);
});

module.exports = minionsRouter;
