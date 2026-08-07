const User = require('../models/User');

async function createUser(req, res) {
  try {
    
    const user = new User(req.body);
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAllUsers(req, res) {
  const users = await User.find(); 
  res.json(users);
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
}

module.exports = { createUser, getAllUsers, getUserById
};