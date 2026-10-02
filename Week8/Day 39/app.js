const express = require("express");

const app = express();

app.use(express.json());


// ----------------------
// Logger Middleware
// ----------------------

function logger(req, res, next) {

    console.log(`${req.method} ${req.url}`);

    next();

}

app.use(logger);


// ----------------------
// Placeholder Authentication Middleware
// ----------------------

function requireAuth(req, res, next) {

    const auth = req.headers.authorization;

    if (!auth) {

        return res.status(401).json({
            error: "Unauthorized"
        });

    }

    next();

}


// ----------------------
// In-Memory Tasks
// ----------------------

let tasks = [

    {
        id: 1,
        title: "Learn Express",
        done: false,
        priority: "high"
    },

    {
        id: 2,
        title: "Finish Homework",
        done: true,
        priority: "medium"
    }

];


// ----------------------
// GET All Tasks
// ----------------------

app.get("/tasks", (req, res) => {

    let result = [...tasks];

    if (req.query.done) {

        const done = req.query.done === "true";

        result = result.filter(task => task.done === done);

    }

    if (req.query.priority) {

        result = result.filter(task => task.priority === req.query.priority);

    }

    res.json(result);

});


// ----------------------
// GET Task by ID
// ----------------------

app.get("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {

        return res.status(404).json({
            error: "Task not found"
        });

    }

    res.json(task);

});


// ----------------------
// POST Create Task
// ----------------------

app.post("/tasks", (req, res) => {

    const { title, done, priority } = req.body;

    if (!title) {

        return res.status(400).json({
            error: "Title is required"
        });

    }

    const newTask = {

        id: Date.now(),

        title,

        done: done || false,

        priority: priority || "low"

    };

    tasks.push(newTask);

    res.status(201).json(newTask);

});


// ----------------------
// PUT Update Task
// ----------------------

app.put("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {

        return res.status(404).json({
            error: "Task not found"
        });

    }

    tasks[index] = {

        ...tasks[index],

        ...req.body

    };

    res.json(tasks[index]);

});


// ----------------------
// DELETE Task
// ----------------------

app.delete("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {

        return res.status(404).json({
            error: "Task not found"
        });

    }

    tasks.splice(index, 1);

    res.status(204).send();

});


// ----------------------
// Protected Route
// ----------------------

app.get("/tasks/secret", requireAuth, (req, res) => {

    res.json({

        message: "This is a protected secret route."

    });

});


// ----------------------
// Route to Test Error Handler
// ----------------------

app.get("/error", (req, res) => {

    throw new Error("Testing Global Error Handler");

});


// ----------------------
// Global Error Handler
// ----------------------

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({

        error: "Something went wrong!"

    });

});


// ----------------------
// Start Server
// ----------------------

app.listen(3000, () => {

    console.log("Server running at http://localhost:3000");

});