"use strict";
var mongoose_1 = require("mongoose");
var bookSchema = new mongoose_1.Schema({
    title: { type: String, default: 'Нечто' },
    description: { type: String, default: 'Что-то' },
    authors: { type: String, default: 'Ананимус' },
    favorite: { type: Boolean, default: false },
    fileCover: { type: String, default: '' },
    fileName: { type: String, default: '' },
    fileBook: { type: String, default: '' }
});
module.exports = (0, mongoose_1.model)('Book', bookSchema);
