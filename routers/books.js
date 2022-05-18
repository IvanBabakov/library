const express = require('express')
const Book = require('../models/book');
const router = express.Router();

const fileMiddleware = require('../middleware/bookFile')
const cpFileMiddleware = fileMiddleware.fields([{name: 'book', maxCount: 1}, {name: 'cover', maxCount: 1}])

const library = {
    books: []
}

const array = [1, 2, 3];
array.map(el => {
    const newBook = new Book(`book ${el}`, `description book ${el}`, 'Author');
    library.books.push(newBook);
})

router.get('/', function (req, res) {
    const { books } = library;
    res.render('books/index', {
        title: 'Библиотека',
        books: books
    })
})

router.get('/create', (req, res) => {
    res.render('books/create', {
        title: 'Book | create',
        book: {}
    })
})

router.post('/create', cpFileMiddleware, function (req, res) {
    let fileName = req.files['book'] ? req.files['book'][0].filename : '';
    let fileBook = req.files['book'] ? req.files['book'][0].path : '';
    let fileCover = req.files['cover'] ? req.files['cover'][0].path : '';

    const {books} = library;
    const {title, description, authors, favorite} = req.body;
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook)

    res.redirect('/books')
})

router.get('/:id', function (req, res) {
    const {books} = library;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render('books/view', {
            title: 'Book | View', 
            book: books[idx]
        })
    } else {
        res.status(404);
        res.status(404).render('errors/404', {title: "Ошибка", errmessage: 'Книга не найдена!'});
    }
})

router.get('/:id/download', function (req, res) {
    const {books} = library;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.download(__dirname+`/../${books[idx].fileBook}`, books[idx].fileName, err=>{
            if (err){
                res.status(404).render('errors/404', {title: 'Ошибка!' ,errmessage:'Экземпляр книги не загружен'});
            }
        })
    } else {
        res.status(404).render('errors/404', {title: 'Ошибка!' ,errmessage:'Экземпляр книги не загружен'});
    }

})

router.get('/update/:id', (req, res) => {
    const {books} = library;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
    if(idx !== -1) {
        res.render('books/update', {
            title: 'Book | update',
            book: books[idx]
        });
    } else {
        res.status(404).render('errors/404', {title: "Ошибка", errmessage: 'Книга не найдена!'});
    }
})

router.post('/update/:id',cpFileMiddleware, function (req, res) {
    const {books} = library;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
    
    if (idx !== -1) {
        let title = req.body.title !== undefined ? req.body.title : books[idx].title;
        let authors = req.body.authors !== undefined ? req.body.authors : books[idx].authors;
        let description = req.body.description !== undefined ? req.body.description : books[idx].description;
        let favorite = req.body.favorite !== undefined ? req.body.favorite : books[idx].favorite;
        
        if(req.files) {
            const fileName = req.files['book'] ? req.files['book'][0].filename : books[idx].fileName;
            const fileBook = req.files['book'] ? req.files['book'][0].path : books[idx].fileBook;
            const fileCover = req.files['cover'] ? req.files['cover'][0].path : books[idx].fileCover;
            books[idx] = {...books[idx], title, description, authors, favorite, fileCover, fileName, fileBook}
  
            res.redirect(`/books/${id}`)
        } else {
            books[idx] = {...books[idx], title, description, authors, favorite}
            res.redirect(`/books/${id}`)
        }
    } else {
        res.status(404);
        res.json({"errcode": "404", "errmessage":'book not found'});
    }

})

router.post('/delete/:id', function (req, res) {
    const {id} = req.params;
    const idx = library.books.findIndex(el => el.id === id);

    if(idx !== -1) {
        const newLibrary = library.books.filter(el => el.id !== id);
        library.books = [...newLibrary];

        res.redirect('/books')
    } else {
        res.status(404);
        res.json({"errcode": "404", "errmessage":'book not found'});
    }
})

module.exports = router;