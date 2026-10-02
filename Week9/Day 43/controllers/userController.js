const User = require("../models/User");

// Create User
const createUser = async (req, res) => {

    try {

        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Users
const getUsers = async (req, res) => {

    try {

        const users = await User.find();

        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createUser,
    getUsers
};