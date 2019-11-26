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
