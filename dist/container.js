"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var BooksRepository_1 = require("./entities/BooksRepository");
var myContainer = new inversify_1.Container();
myContainer.bind(BooksRepository_1.BooksRepository).toSelf();
