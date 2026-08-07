require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const auth = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(cors());

let users = [];

// REGISTER
app.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (user) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }

    const hash = await bcrypt.hash(password, 10);

    users.push({
        id: users.length + 1,
        name,
        email,
        password: hash
    });

    res.status(201).json({
        message: "User Registered"
    });

});

// LOGIN

app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    const token = jwt.sign(
        {
            id: user.id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    res.json({
        token
    });

});

// PROFILE

app.get("/profile", auth, (req, res) => {

    const user = users.find(u => u.id === req.user.id);

    res.json({
        id: user.id,
        name: user.name,
        email: user.email
    });

});

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});