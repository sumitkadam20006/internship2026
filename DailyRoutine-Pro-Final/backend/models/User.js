const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    // Optional because Google users don't have a local password
    password: {
      type: String,
      minlength: 6,
      default: null
    },

    // Google account ID
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },

    avatar: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

// Hash password only when a password exists/changes
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;

  this.password = await bcrypt.hash(this.password, 12);
});

// Existing email/password login
userSchema.methods.matchPassword = function (password) {
  if (!this.password) return false;

  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);