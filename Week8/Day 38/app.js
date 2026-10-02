const express = require("express");
const app = express();

app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Complete Assignment",
    done: false,
    priority: "high"
  },
  {
    id: 2,
    title: "Study Express",
    done: true,
    priority: "medium"
  }
];

// GET all tasks
app.get("/tasks", (req, res) => {

  let result = tasks;

  if (req.query.done) {
    result = result.filter(
      task => task.done === (req.query.done === "true")
    );
  }

  if (req.query.priority) {
    result = result.filter(
      task => task.priority === req.query.priority
    );
  }

  res.json(result);

});

// GET one task
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

// POST task
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

// PUT task
app.put("/tasks/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = tasks.findIndex(
    task => task.id === id
  );

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

// DELETE task
app.delete("/tasks/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = tasks.findIndex(
    task => task.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  tasks.splice(index, 1);

  res.status(204).send();

});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});