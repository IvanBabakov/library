export interface Connect {
    getBooks(): any[];
    getBook(id: number): {};
    saveBook(data: {}): string;
    updateBook(id: number): string;
    deletBook(id: number): string;
}