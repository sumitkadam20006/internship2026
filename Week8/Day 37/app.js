const express = require('express');
const path = require('path');
const app = express();

// CORS — allow frontend from any origin (file://, etc.)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

app.use(express.json()); // needed to read JSON request bodies — see §5

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'frontend')));

let students = [
  { id: 1, name: 'Aditi', marks: 88 },
  { id: 2, name: 'Rohan', marks: 76 }
];

// GET — read all
app.get('/students', (req, res) => {
  res.json(students);
});

// POST — create one
app.post('/students', (req, res) => {
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  res.status(201).json(newStudent); // 201 = Created
});

// PUT — update one, by :id route parameter
app.put('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: 'Student not found' });
  students[index] = { ...students[index], ...req.body };
  res.json(students[index]);
});

// DELETE — remove one, by :id route parameter
app.delete('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  students = students.filter(s => s.id !== id);
  res.status(204).send(); // 204 = No Content, deleted successfully
});

const server = app.listen(3000, () => {
    console.log('Running on http://localhost:3000');
});