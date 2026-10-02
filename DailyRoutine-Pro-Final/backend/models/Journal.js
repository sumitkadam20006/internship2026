const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  mood: { type: String, enum: ["great", "good", "okay", "low", "bad"], default: "good" },
  entry: { type: String, required: true },
  date: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model("Journal", schema);
