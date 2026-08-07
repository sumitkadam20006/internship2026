const express = require("express");

const router = express.Router();

const {
  createPost,
  getAllPosts,
  getMyPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const requireAuth = require("../middleware/requireAuth");

// Public Route
router.get("/", getAllPosts);

// Protected Routes
router.post("/", requireAuth, createPost);

router.get("/mine", requireAuth, getMyPosts);

router.put("/:id", requireAuth, updatePost);

router.delete("/:id", requireAuth, deletePost);

module.exports = router;