const express = require("express");
const ideasRouter = express.Router();

ideasRouter.get("/", (req, res, next) => {
  console.log("/ideas");
  res.send("works");
});

module.exports = ideasRouter;
