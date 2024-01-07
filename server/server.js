"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var port = 3000;
var app = express();
app.get('/', function (req, res) {
    res.send('api is working');
});
app.listen(port, function () {
    console.log("app is running on port ".concat(port));
});
