const express = require("express");

const router = express.Router();

const {
  register,
  login,
  logout,
  getProfile,
  getMyPosts,
} = require("../controllers/authController");

const requireAuth = require("../middleware/requireAuth");

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

// Logout User
router.post("/logout", logout);

// Get Logged-in User Profile (Protected)
router.get("/profile", requireAuth, getProfile);

router.get("/myposts", requireAuth, getMyPosts);

module.exports = router;