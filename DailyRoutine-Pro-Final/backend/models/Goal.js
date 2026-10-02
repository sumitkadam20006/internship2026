const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, default: "" },
  category: { type: String, default: "Personal" },
  targetDate: { type: String, default: "" },
  progress: { type: Number, min: 0, max: 100, default: 0 },
  status: { type: String, enum: ["active", "completed", "paused"], default: "active" }
}, { timestamps: true });
module.exports = mongoose.model("Goal", schema);
