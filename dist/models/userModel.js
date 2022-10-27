"use strict";
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: {
        type: String, default: 'Кто-то'
    },
    email: {
        type: String, default: 'email'
    },
    password: {
        type: String, default: 'password'
    }
});
module.exports = (0, mongoose_1.model)('User', userSchema);
