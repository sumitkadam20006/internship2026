const fs = require('fs');

// 1. Synchronous — blocks until done
fs.writeFileSync('notes.txt', 'Day 36: Node.js basics');
console.log('Sync write done');

// 2. Asynchronous — callback style
fs.writeFile('notes.txt', 'Day 36: Node.js basics', (err) => {
    if (err) throw err;
    console.log('Async (callback) write done');
});

// 3. Asynchronous — Promise + async/await style
const fsPromises = require('fs').promises; 

async function saveNote() {
    await fsPromises.writeFile('notes.txt', 'Day 36: Node.js basics');
    console.log('Promise-based write done');
}
saveNote();