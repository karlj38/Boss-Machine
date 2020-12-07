const checkMillionDollarIdea = (req, res, next) => {
  const idea = req.body;
  idea.numWeeks = Number(idea.numWeeks);
  idea.weeklyRevenue = Number(idea.weeklyRevenue);
  if (
    typeof idea.description === "string" &&
    typeof idea.name === "string" &&
    idea.name.length > 0 &&
    typeof idea.numWeeks === "number" &&
    typeof idea.weeklyRevenue === "number" &&
    idea.weeklyRevenue * idea.numWeeks >= 1000000
  ) {
    next();
  } else {
    res.sendStatus(400);
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
