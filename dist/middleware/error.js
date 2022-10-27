"use strict";
module.exports = function (req, res) {
    res.status(404);
    var content = '404 | not found';
    res.send(content);
};
