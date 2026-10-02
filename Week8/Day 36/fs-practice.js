const fs = require("fs");
let today = new Date().toDateString();

fs.writeFile("diary.txt", "Date: " + today + "\n", (err) => {
    if (err) throw err;
    console.log("Diary created");
    
    fs.appendFile("diary.txt", "Node.js Practice\n", (err) => {
        if (err) throw err;
        console.log("Text added");

        fs.readFile("diary.txt", "utf8", (err, data) => {
            if (err) throw err;
            console.log(data);
        });
    });
});