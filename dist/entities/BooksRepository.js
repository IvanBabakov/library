"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRepository = void 0;
require("reflect-metadata");
var types_1 = require("../types");
var inversify_1 = require("inversify");
var BooksRepository = /** @class */ (function () {
    function BooksRepository(book, repo) {
        // this._repo = [];
        // this._book = book
    }
    BooksRepository.prototype.createBook = function () {
        this._repo.push(this._book);
        return 'Your book was create';
    };
    BooksRepository.prototype.getBook = function (id) {
        return this._repo.find(function (x) { return x.id === id; });
    };
    ;
    BooksRepository.prototype.getBooks = function () {
        return this._repo;
    };
    ;
    BooksRepository.prototype.updateBook = function (id) {
        return this._repo.find(function (x) { return x.id === id; });
    };
    ;
    BooksRepository.prototype.deleteBook = function (id) {
        this._repo.filter(function (x) { return x.id !== id; });
        return 'Book was delete';
    };
    ;
    BooksRepository = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Book)),
        __param(1, (0, inversify_1.inject)(types_1.TYPES.Repository)),
        __metadata("design:paramtypes", [Object, Object])
    ], BooksRepository);
    return BooksRepository;
}());
exports.BooksRepository = BooksRepository;
