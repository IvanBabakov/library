export interface Repository {
    _repo: any[];
    createBook (book: {}): string;
    getBook(id: number): {};
    getBooks(): any[];
    updateBook(id: number): {};
    deleteBook(id: number): string;
}