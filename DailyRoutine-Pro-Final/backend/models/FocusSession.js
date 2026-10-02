const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  minutes: { type: Number, required: true, min: 1 },
  mode: { type: String, enum: ["focus", "break"], default: "focus" },
  label: { type: String, default: "Focus Session" },
  date: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model("FocusSession", schema);
