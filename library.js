const express = require('express')
const formData = require("express-form-data");

const app = express();
app.use(formData.parse());

const Book = require('./models/book');

const library = {
    books: []
}

const array = [1, 2, 3];
array.map(el => {
    const newBook = new Book(`book ${el}`, `description book ${el}`);
    library.books.push(newBook);
})

app.get('/api/books', function (req, res) {
  res.json(library.books)
})

app.get('/api/books/:id', function (req, res) {
    const {books} = library;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404);
        res.send('book not found');
    }
})

app.put('/api/books/:id', function (req, res) {
    const {books} = library;
    const {id} = req.params;
    const {title, description, favorite} = req.body;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books[idx] = {...books[idx], title, description, favorite}
        res.json(books[idx])
    } else {
        res.status(404);
        res.send('book not found');
    }

})

app.post('/api/user/login', function (req, res) {
    res.status(201);
    res.json({ id: 1, mail: "test@mail.ru" })
})

app.post('/api/books', function (req, res) {
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
    library.books.push(newBook)

    res.json(library.books.find(el => el.id === newBook.id))
})

app.delete('/api/books/:id', function (req, res) {
    const {id} = req.params;
    const newLibrary = library.books.filter(el => el.id !== id);
    library.books = [...newLibrary];

    res.send("Ok!")
})

app.listen(3000)