const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"], trim: true },
  description: { type: String, default: "", trim: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Task", taskSchema);
