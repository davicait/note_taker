const express = require("express");
const path = require("path");
const fs = require("fs");

let counter = 1;

const db = path.join(__dirname, "/db/db.json");

// Process to read JSON file
const read = JSON.parse(
    fs.readFileSync(db, (err, data) => {
        if (err) throw err;
    })
)

// Function to read JSON file
const write = read => {
    let filter = read.filter(function(x) {
        return x != null;
    });
    fs.writeFileSync(
        path.join(__dirname, "/db/db.json"),
        JSON.stringify(filtered),
        err => {
            if (err) throw err;
        }   
     );
};

// Express
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Server Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/develop/index.html"));
});

app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "/develop/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/develop/notes.html"));
});

app.get("/api/notes", function(req, res) {
    return res.json(read);
});

// Post Method
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    newNote.id = counter;
    counter++;
    read.push(newNote);
    write(read);
    return res.json(read);
});