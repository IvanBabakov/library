import "reflect-metadata";
import { Repository } from "../interfaces/Repository";
import { DbConnect } from "./dbCoonect";
import { Book } from "../interfaces/Book";
import { TYPES } from '../types';
import { injectable, inject } from "inversify";

@injectable()
class BooksRepository implements Repository {
    public _connect: DbConnect;

    constructor (@inject(TYPES.Connect) connect: DbConnect) {
        this._connect = connect;
    }

    createBook(book: Book): string {
        this._connect.saveBook(book);
        return 'Your book was create'
    }

    getBook(id: string): {} {
        return  this._connect.getBook(id)      
    };

    getBooks(): any[] {
        return this._connect.getBooks()
    };

    getUpdatingBook(id: string): {} {
        return this._connect.getUpdatingBook(id)
    };

    saveUpdatedBook(id: string, book: Book): void {
        this._connect.saveUpdatedBook(id, book);
    }

    deleteBook(id: string): string {
        this._connect.deletBook(id)
        return 'Book was delete'
    };
}

export { BooksRepository }