import express from 'express';
import Book from '../models/bookModel';
const router = express.Router();

router.get('/', async (req, res) => {
    const books = await Book.find();
    res.render('books/index', {
        title: 'Библиотека',
        books: books
    });
})

router.get('/create', (req, res) => {
    res.render('books/create', {
        title: 'Book | create',
        book: {}
    })
})

router.post('/create', async (req, res) => {

    const {title, description, authors, favorite, fileCover, fileName, fileBook}  = req.body;

    const newBook = new Book({
        title: title,
        description: description,
        authors: authors, 
        favorite: favorite, 
        fileCover: fileCover, 
        fileName: fileName, 
        fileBook: fileBook
    })
    try {
        await newBook.save();
        res.redirect('/books')
    } catch(error) {
        console.log(`Тут какая-то херня! Вот:${error}`)
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let book

    try {
        book = await Book.findById(id) 
    } catch (error) {
        console.log(error);
        res.status(404).render('errors/404', {title: "Ошибка", errmessage: 'Книга не найдена!'});
    }

    res.render('books/view', {
        title: 'Book | View', 
        book: book
    });
})

// router.get('/:id/download', async (req, res) {
//     const {id} = req.params;
//     // if (idx !== -1) {
//     //     res.download(__dirname+`/../${books[idx].fileBook}`, books[idx].fileName, err=>{
//     //         if (err){
//     //             res.status(404).render('errors/404', {title: 'Ошибка!' ,errmessage:'Экземпляр книги не загружен'});
//     //         }
//     //     })
//     // } else {
//     //     res.status(404).render('errors/404', {title: 'Ошибка!' ,errmessage:'Экземпляр книги не загружен'});
//     // }

// })

router.get('/update/:id', async (req, res) => {
    const {id} = req.params;
    let book;

    try {
       book = await Book.findById(id)
    } catch (error) {
        console.log(error);
        res.status(404).render('errors/404', {title: "Ошибка", errmessage: 'Книга не найдена!'});
    }

    res.render('books/update', {
        title: 'Book | update',
        book: book
    });
})

router.post('/update/:id', async (req, res) => {
    const {id} = req.params;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;

    try {
        await Book.findByIdAndUpdate(id, {
            title: title,
            description: description,
            authors: authors, 
            favorite: favorite, 
            fileCover: fileCover, 
            fileName: fileName, 
            fileBook: fileBook
        })
    } catch (error) {
        console.log(error);
        res.status(404).render('errors/404', {title: "Ошибка", errmessage: 'Что-то пошло не так'});
    }

    res.redirect(`/books/${id}`)
    
})

router.post('/delete/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Book.deleteOne({_id: id})
    } catch (error) {
        console.log(error);
        res.status(404).render('errors/404', {title: "Ошибка", errmessage: 'Что-то пошло не так'});
    }
   
    res.redirect('/books')
})

export = router;