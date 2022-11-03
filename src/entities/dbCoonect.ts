import { injectable } from "inversify";
import { Book } from "../interfaces/Book";
import { Connect } from "../interfaces/Connect";
import BookModel from '../models/bookModel';

@injectable()
export class DbConnect implements Connect {
    getBooks(): any {
        return BookModel.find();
    }
    getBook(id: string): {} {
        return BookModel.findById(id);
    }
    saveBook(data: Book): any {
        return new BookModel(data).save()
    }
    getUpdatingBook(id: string): {} {
        return BookModel.findById(id);
    }

    saveUpdatedBook(id: string, book: Book): void {
        BookModel.findByIdAndUpdate(id, book)
    }

    deletBook(id: string): any {
        return BookModel.deleteOne({_id: id});
    }
}