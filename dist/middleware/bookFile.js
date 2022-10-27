"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/books');
    },
    filename: function (req, file, cb) {
        cb(null, "".concat(new Date().toISOString().replace(/:/g, '-'), "-").concat(file.originalname));
    }
});
var allowedTypes = ['text/html', 'application/pdf', 'application/epub+zip', 'application/epub', 'image/png', 'image/jpg', 'image/jpeg'];
var fileFilter = function (req, file, cb) {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
        console.log(file.mimetype);
    }
};
module.exports = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter
});
