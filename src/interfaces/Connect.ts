export interface Connect {
    getBooks(): any;
    getBook(id: string): {};
    saveBook(data: {}): any;
    getUpdatingBook(id: string): {};
    saveUpdatedBook(id: string, book: {}): void;
    deletBook(id: string): string;
}