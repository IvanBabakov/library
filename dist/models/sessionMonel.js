"use strict";
var mongoose_1 = require("mongoose");
var sessionSchema = new mongoose_1.Schema({
    sid: { type: String, required: true, unique: true, index: true },
    expires: { type: Number, index: true, required: true },
    data: {}
});
module.exports = (0, mongoose_1.model)('Session', sessionSchema);
