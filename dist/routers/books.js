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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var bookModel_1 = __importDefault(require("../models/bookModel"));
var router = express_1.default.Router();
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bookModel_1.default.find()];
            case 1:
                books = _a.sent();
                res.render('books/index', {
                    title: 'Библиотека',
                    books: books
                });
                return [2 /*return*/];
        }
    });
}); });
router.get('/create', function (req, res) {
    res.render('books/create', {
        title: 'Book | create',
        book: {}
    });
});
router.post('/create', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, authors, favorite, fileCover, fileName, fileBook, newBook, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description, authors = _a.authors, favorite = _a.favorite, fileCover = _a.fileCover, fileName = _a.fileName, fileBook = _a.fileBook;
                newBook = new bookModel_1.default({
                    title: title,
                    description: description,
                    authors: authors,
                    favorite: favorite,
                    fileCover: fileCover,
                    fileName: fileName,
                    fileBook: fileBook
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, newBook.save()];
            case 2:
                _b.sent();
                res.redirect('/books');
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.log("\u0422\u0443\u0442 \u043A\u0430\u043A\u0430\u044F-\u0442\u043E \u0445\u0435\u0440\u043D\u044F! \u0412\u043E\u0442:".concat(error_1));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, book, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, bookModel_1.default.findById(id)];
            case 2:
                book = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(404).render('errors/404', { title: "Ошибка", errmessage: 'Книга не найдена!' });
                return [3 /*break*/, 4];
            case 4:
                res.render('books/view', {
                    title: 'Book | View',
                    book: book
                });
                return [2 /*return*/];
        }
    });
}); });
// router.get('/:id/download', async (req, res) {
//     const {id} = req.params;
//     // if (idx !== -1) {
//     //     res.download(__dirname+`/../${books[idx].fileBook}`, books[idx].fileName, err=>{
//     //         if (err){
//     //             res.status(404).render('errors/404', {title: 'Ошибка!' ,errmessage:'Экземпляр книги не загружен'});
//     //         }
//     //     })
//     // } else {
//     //     res.status(404).render('errors/404', {title: 'Ошибка!' ,errmessage:'Экземпляр книги не загружен'});
//     // }
// })
router.get('/update/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, book, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, bookModel_1.default.findById(id)];
            case 2:
                book = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(404).render('errors/404', { title: "Ошибка", errmessage: 'Книга не найдена!' });
                return [3 /*break*/, 4];
            case 4:
                res.render('books/update', {
                    title: 'Book | update',
                    book: book
                });
                return [2 /*return*/];
        }
    });
}); });
router.post('/update/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, description, authors, favorite, fileCover, fileName, fileBook, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, title = _a.title, description = _a.description, authors = _a.authors, favorite = _a.favorite, fileCover = _a.fileCover, fileName = _a.fileName, fileBook = _a.fileBook;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, bookModel_1.default.findByIdAndUpdate(id, {
                        title: title,
                        description: description,
                        authors: authors,
                        favorite: favorite,
                        fileCover: fileCover,
                        fileName: fileName,
                        fileBook: fileBook
                    })];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                console.log(error_4);
                res.status(404).render('errors/404', { title: "Ошибка", errmessage: 'Что-то пошло не так' });
                return [3 /*break*/, 4];
            case 4:
                res.redirect("/books/".concat(id));
                return [2 /*return*/];
        }
    });
}); });
router.post('/delete/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, bookModel_1.default.deleteOne({ _id: id })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                res.status(404).render('errors/404', { title: "Ошибка", errmessage: 'Что-то пошло не так' });
                return [3 /*break*/, 4];
            case 4:
                res.redirect('/books');
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
