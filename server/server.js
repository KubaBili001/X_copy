"use strict";
// import { Request, Response} from 'express'
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require('bcryptjs');
bcrypt
    .hash('kubabili', 10)
    .then(function (hash) {
    console.log(hash);
    validateHash(hash);
});
function validateHash(hash) {
    bcrypt
        .compare('kubabili', hash)
        .then(function (res) {
        if (res) {
            console.log(true);
        }
        else {
            console.log(false);
        }
    })
        .catch(function (err) { return console.log(err.message); });
}
