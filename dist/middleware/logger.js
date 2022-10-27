"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var fs_1 = __importDefault(require("fs"));
var os_1 = __importDefault(require("os"));
module.exports = function (req, res, next) {
    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var method = req.method, url = req.url;
    var userAgent = req.get("user-agent");
    var data = "".concat(hour, ":").concat(minutes, ":").concat(seconds, " ").concat(method, ": ").concat(url, " user-agent: ").concat(userAgent);
    console.log(data);
    fs_1.default.appendFile("server.log", data + os_1.default.EOL, function (err) {
        if (err)
            throw err;
    });
    next();
};
