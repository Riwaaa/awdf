module.exports = function validateTask(req, res, next) {
  if (req.method === "POST" && (!req.body.title || !req.body.title.trim())) {
    return res.status(400).json({ error: "Title is required" });
  }
  if (req.body.priority && !["low", "medium", "high"].includes(req.body.priority)) {
    return res.status(400).json({ error: "Priority must be low, medium, or high" });
  }
  next();
};
