const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  age: {
    type: Number,
    default: 18 
  },

  role: {
    type: String,
    default: 'student'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;