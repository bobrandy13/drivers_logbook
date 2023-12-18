"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var app = express();
var port = 3000;
app.use("/static", express.static(path.join(__dirname, "public")));
app.get("/", function (req, res) {
    res.send("Hello world");
});
/**
 * function to return the driver logbook details.
 */
app.post("/", function (req, res) {
    res.send("got a post request");
});
app.listen(port, function () {
    console.log("listening on port ".concat(port));
});
