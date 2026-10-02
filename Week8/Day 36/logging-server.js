const http = require("http");
const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "visits.log");

function logVisit(req) {

    const entry =
        new Date().toISOString() +
        " - " +
        req.method +
        " " +
        req.url +
        "\n";

    fs.appendFile(LOG_FILE, entry, (err) => {
        if (err)
            console.log("Error writing log");
    });

}

const server = http.createServer((req, res) => {

    logVisit(req);

    if (req.url === "/") {

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("Visit logged. Check visits.log");

    }

    else if (req.url === "/logs") {

        fs.readFile(LOG_FILE, "utf8", (err, data) => {

            if (err) {

                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });

                res.end("No visits yet");

            }

            else {

                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });

                res.end(data);

            }

        });

    }

    else {

        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("404 Not Found");

    }

});

server.listen(3000, () => {

    console.log("Server running at http://localhost:3000");

});