const express = require('express')
const Book = require('../../models/bookModel');
const router = express.Router();

router.get('/',async (req, res) => {
    const books = await Book.find().select('-__v');
    res.json(books)
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const book = await Book.findById(id).select('-__v');
        res.json(book) 
    } catch (error) {
        console.error(error);
        res.status(404).json("todo | not found");
    }
})

// router.get('/:id/download', function (req, res) {
//     const {books} = library;
//     const {id} = req.params;
//     const idx = books.findIndex(el => el.id === id);

//     if (idx !== -1) {
//         res.download(__dirname+`/../${books[idx].fileBook}`, books[idx].fileName, err=>{
//             if (err){
//                 res.status(404).json();
//             }
//         })
//     } else {
//         res.status(404);
//         res.json({"errcode": "404", "errmessage":'book not found'});
//     }

// })

router.put('/:id', async (req, res) => {
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
        res.redirect(`/api/books/${id}`)
    } catch (error) {
        console.error(error);
        res.status(404).json("Что-то пошло не так");
    }
})

router.post('/', async (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;

    const newBdook = new Book({
        title: title,
        description: description,
        authors: authors, 
        favorite: favorite, 
        fileCover: fileCover, 
        fileName: fileName, 
        fileBook: fileBook
    })
    
    try {
        await newBdook.save();
        res.json(newBdook)
    } catch (error) {
        console.error(error);
        res.status(404).json("Что-то пошло не так");
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Book.deleteOne({_id: id});
        res.json(true)
    } catch (error) {
        console.error(error);
        res.status(404).json('Не удалось удалить');
    }
})

module.exports = router;