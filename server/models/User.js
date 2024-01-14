"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(_id, username, email, password, role, name, last_name, birth_date, join_date) {
        this._id = _id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.name = name;
        this.last_name = last_name;
        this.birth_date = birth_date;
        this.join_date = join_date;
    }
    return User;
}());
exports.default = User;
