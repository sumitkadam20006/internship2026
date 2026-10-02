const Post = require("../models/Post");

// Create Post
const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);

        res.status(201).json({
            success: true,
            post
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Posts
const getPosts = async (req, res) => {
    try {

        const posts = await Post.find()
            .populate("author", "name email");

        res.status(200).json({
            success: true,
            posts
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get One Post
const getPost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id)
            .populate("author", "name email");

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            post
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createPost,
    getPosts,
    getPost
};