const express = require("express");
const meetingsRouter = express.Router();

meetingsRouter.get("/", (req, res, next) => {
  console.log("/meetings");
  res.send("works");
});

module.exports = meetingsRouter;
