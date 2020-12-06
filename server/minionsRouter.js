const express = require("express");
const minionsRouter = express.Router();

minionsRouter.get("/", (req, res, next) => {
  console.log(".../minions");
  res.send("works");
});

module.exports = minionsRouter;
