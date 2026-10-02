const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  category: { type: String, default: "Personal" },
  frequency: { type: String, enum: ["daily", "weekdays", "weekly"], default: "daily" },
  streak: { type: Number, default: 0 },
  lastCompleted: { type: String, default: "" },
  color: { type: String, default: "#7c5cff" }
}, { timestamps: true });
module.exports = mongoose.model("Habit", schema);
