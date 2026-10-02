const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

function token(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: "Email is already registered" });
    const user = await User.create({ name, email, password });
    res.status(201).json({ token: token(user._id.toString()), user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: (email || "").toLowerCase() });
    if (!user || !(await user.matchPassword(password || ""))) return res.status(401).json({ message: "Invalid email or password" });
    res.json({ token: token(user._id.toString()), user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user: { id: user._id, name: user.name, email: user.email } });
});

module.exports = router;
