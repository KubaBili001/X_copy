"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('mongodb'), MongoClient = _a.MongoClient, ServerApiVersion = _a.ServerApiVersion;
var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
var express = require('express');
var bcrypt = require('bcryptjs');
var cors = require('cors');
var fs = require('fs').promises;
require('dotenv').config();
// PORT NUMBER
var port = 3001;
var client;
// Get database connection string from a text file
var getConn = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs.readFile('../database/db-conn.txt', 'utf8')];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                throw err_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
// Assign database string using promise
getConn()
    .then(function (result) {
    //Create a MongoClient with a MongoClientOptions object to set the Stable API version
    client = new MongoClient(result, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
})
    .catch(function (err) { return console.error(err); });
// Create server
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/', function (req, res) {
    console.log("/");
    res.send('api is working');
});
app.post('/signin', function (req, res) {
    console.log("/signin");
    var _a = req.body, username = _a.username, password = _a.password;
    var validate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var database, users, query, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 4, 6]);
                        return [4 /*yield*/, client.connect()];
                    case 1:
                        _a.sent();
                        database = client.db("tin_project");
                        users = database.collection("user");
                        query = { username: username };
                        return [4 /*yield*/, users.findOne(query)];
                    case 2:
                        user = (_a.sent());
                        if (!user) {
                            return [2 /*return*/, {
                                    message: "User name is not found. Invalid login credentials.",
                                    success: false,
                                }];
                        }
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 3:
                        if (!(_a.sent())) {
                            return [2 /*return*/, {
                                    message: "Incorrect password",
                                    success: false,
                                }];
                        }
                        return [2 /*return*/, {
                                token: jwt.sign({
                                    role: user.role,
                                    name: user.name,
                                    email: user.email,
                                }, process.env.APP_SECRET, { expiresIn: "1 day" }),
                                message: "Correct password",
                                success: true,
                            }];
                    case 4: return [4 /*yield*/, client.close()];
                    case 5:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    validate()
        .then(function (result) { res.send(result); })
        .catch(console.dir);
});
app.post('/signup', function (req, res) {
    console.log("/signup");
    var _a = req.body, name = _a.name, lastName = _a.lastName, email = _a.email, username = _a.username, password = _a.password, date = _a.date;
    console.log(date);
    var validate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var database, users, salt, hash, obj, result, exc_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 6]);
                        return [4 /*yield*/, client.connect()];
                    case 1:
                        _a.sent();
                        database = client.db("tin_project");
                        users = database.collection("user");
                        salt = bcrypt.genSaltSync(10);
                        hash = bcrypt.hashSync(password, salt);
                        obj = {
                            username: username,
                            email: email,
                            password: hash,
                            role: "user",
                            name: name,
                            last_name: lastName,
                            birth_date: date,
                            join_date: new Date()
                        };
                        return [4 /*yield*/, users.insertOne(obj)];
                    case 2:
                        result = _a.sent();
                        console.log("A document was inserted with the _id: ".concat(result.insertedId));
                        return [2 /*return*/, {
                                message: "User added.",
                                success: true,
                            }];
                    case 3:
                        exc_1 = _a.sent();
                        return [2 /*return*/, {
                                message: exc_1,
                                success: false,
                            }];
                    case 4: return [4 /*yield*/, client.close()];
                    case 5:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    validate()
        .then(function (result) { res.send(result); })
        .catch(console.dir);
});
app.listen(port, function () {
    console.log("app is running on port ".concat(port));
});
