import "reflect-metadata";
import { Repository } from "../interfaces/Repository";
import { Book } from "../interfaces/Book";
import { TYPES } from '../types';
import { injectable, inject } from "inversify";

@injectable()
class BooksRepository implements Repository {
    _repo: any[]

    constructor () {
            this._repo = [];
    }

    createBook(book: Book): string {
        this._repo.push(book);
        return 'Your book was create'
    }

    getBook(id: number): {} {
        return  this._repo.find(x => x.id === id)      
    };
    getBooks(): any[] {
        return this._repo
    };
    updateBook(id: number): {} {
        return this._repo.find(x => x.id === id)
    };
    deleteBook(id: number): string {
        this._repo.filter(x => x.id !== id)
        return 'Book was delete'
    };
}

export { BooksRepository }