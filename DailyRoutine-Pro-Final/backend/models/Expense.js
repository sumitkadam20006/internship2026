const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true, maxlength: 120 },
  category: { type: String, default: "Other" },
  amount: { type: Number, required: true, min: 0 },
  date: { type: String, required: true },
  note: { type: String, default: "" }
}, { timestamps: true });
module.exports = mongoose.model("Expense", schema);
