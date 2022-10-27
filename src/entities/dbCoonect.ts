import { Connect } from "../interfaces/Connect";

export class DbConnect implements Connect {
    getBooks(): any[] {
        throw new Error("Method not implemented.");
    }
    getBook(id: number): {} {
        throw new Error("Method not implemented.");
    }
    saveBook(data: {}): string {
        throw new Error("Method not implemented.");
    }
    updateBook(id: number): string {
        throw new Error("Method not implemented.");
    }
    deletBook(id: number): string {
        throw new Error("Method not implemented.");
    }

}