export interface Repository {
    createBook (data: {}): string;
    getBook(id: string): {};
    getBooks(): any[];
    getUpdatingBook(id: string): {};
    saveUpdatedBook(id: string, data: {}): void; 
    deleteBook(id: string): string;
}