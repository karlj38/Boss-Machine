const db = require("./db");
const express = require("express");
const ideasRouter = express.Router();

ideasRouter.get("/", (req, res, next) => {
  const allIdeas = db.getAllFromDatabase("ideas");
  res.send(allIdeas);
});

module.exports = ideasRouter;
