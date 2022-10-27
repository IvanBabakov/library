export interface Repository {
    createBook (data: {}): string;
    getBook(id: number): {};
    getBooks(): any[];
    updateBook(id: number): {};
    deleteBook(id: number): string;
}