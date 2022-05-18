const express = require('express')
const Book = require('../../models/book');
const router = express.Router();

const fileMiddleware = require('../../middleware/bookFile')
const cpFileMiddleware = fileMiddleware.fields([{name: 'book', maxCount: 1}, {name: 'cover', maxCount: 1}])

const library = {
    books: []
}

const array = [1, 2, 3];
array.map(el => {
    const newBook = new Book(`book ${el}`, `description book ${el}`);
    library.books.push(newBook);
})

router.get('/', function (req, res) {
    res.json(library.books)
})

router.get('/:id', function (req, res) {
    const {books} = library;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404);
        res.json({"errcode": "404", "errmessage":'book not found'});
    }
})

router.get('/:id/download', function (req, res) {
    const {books} = library;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.download(__dirname+`/../${books[idx].fileBook}`, books[idx].fileName, err=>{
            if (err){
                res.status(404).json();
            }
        })
    } else {
        res.status(404);
        res.json({"errcode": "404", "errmessage":'book not found'});
    }

})

router.put('/:id',cpFileMiddleware, function (req, res) {
    const {books} = library;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
    
    if (idx !== -1) {
        let title = req.body.title !== undefined ? req.body.title : books[idx].title;
        let description = req.body.description !== undefined ? req.body.description : books[idx].description;
        let favorite = req.body.favorite !== undefined ? req.body.favorite : books[idx].favorite;
        
        if(req.files) {
            const fileName = req.files['book'] ? req.files['book'][0].filename : books[idx].fileName;
            const fileBook = req.files['book'] ? req.files['book'][0].path : books[idx].fileBook;
            const fileCover = req.files['cover'] ? req.files['cover'][0].path : books[idx].fileCover;
            books[idx] = {...books[idx], title, description, favorite, fileCover, fileName, fileBook}
            res.json(books[idx])
        } else {
            books[idx] = {...books[idx], title, description, favorite}
            res.json(books[idx])
        }
    } else {
        res.status(404);
        res.json({"errcode": "404", "errmessage":'book not found'});
    }

})

router.post('/', cpFileMiddleware, function (req, res) {
    let fileName = req.files['book'] ? req.files['book'][0].filename : '';
    let fileBook = req.files['book'] ? req.files['book'][0].path : '';
    let fileCover = req.files['cover'] ? req.files['cover'][0].path : '';

    const {title, description, authors, favorite} = req.body;
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    library.books.push(newBook)

    res.json(library.books.find(el => el.id === newBook.id))
})

router.delete('/:id', function (req, res) {
    const {id} = req.params;
    const idx = library.books.findIndex(el => el.id === id);

    if(idx !== -1) {
        const newLibrary = library.books.filter(el => el.id !== id);
        library.books = [...newLibrary];

        res.send("Ok!")
    } else {
        res.status(404);
        res.json({"errcode": "404", "errmessage":'book not found'});
    }
})

module.exports = router;