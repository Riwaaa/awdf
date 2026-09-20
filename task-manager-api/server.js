require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./models/Task");
const User = require("./models/User");
const auth = require("./middleware/auth");
const validateTask = require("./middleware/validateTask");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

app.get("/", (req, res) => res.json({ message: "Task Manager API is running" }));

app.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });
    if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters" });
    if (await User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ error: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: "Registration successful", user: { id: user._id, email: user.email } });
  } catch (err) { next(err); }
});

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: (email || "").toLowerCase() });
    if (!user || !(await bcrypt.compare(password || "", user.password))) return res.status(401).json({ error: "Invalid email or password" });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) { next(err); }
});

app.get("/me", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) { next(err); }
});

app.get("/tasks", auth, async (req, res, next) => {
  try { res.json(await Task.find({ user: req.user.id }).sort({ createdAt: -1 })); }
  catch (err) { next(err); }
});

app.get("/tasks/:id", auth, async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) { next(err); }
});

app.post("/tasks", auth, validateTask, async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user.id });
    res.status(201).json(task);
  } catch (err) { next(err); }
});

app.put("/tasks/:id", auth, validateTask, async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) { next(err); }
});

app.delete("/tasks/:id", auth, async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully", task });
  } catch (err) { next(err); }
});

app.use((req, res) => res.status(404).json({ error: "Route not found" }));
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: "Validation failed", details: Object.values(err.errors).map(e => e.message) });
  }
  if (err.name === "CastError") return res.status(400).json({ error: "Invalid ID format" });
  res.status(500).json({ error: "Something went wrong" });
});

async function start() {
  if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error("Missing MONGO_URI or JWT_SECRET in .env");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
start().catch((err) => { console.error("Startup error:", err.message); process.exit(1); });
