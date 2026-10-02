const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, default: "" },
  category: { type: String, default: "Personal" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  dueDate: { type: String, default: "" },
  time: { type: String, default: "" },
  reminder: { type: Boolean, default: false },
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" }
}, { timestamps: true });
module.exports = mongoose.model("Task", schema);
