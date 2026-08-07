const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = 5000;
const quotes = [
    { id: 1, text: "Code never lies, comments sometimes do.", author: "Ron Jeffries" },
    { id: 2, text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { id: 3, text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { id: 4, text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { id: 5, text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" }
];
app.get('/api/quotes', (req, res) => {
    res.json(quotes);
});
app.get('/api/quotes/random', (req, res) => {
    const  random = quotes [Math.floor(Math.random() * quotes.length)];
    res.json(random);
});
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});