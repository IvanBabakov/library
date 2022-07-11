// const uidGenerator = require('node-unique-id-generator');

// class Book {
//     constructor(title = " ", description= " ", authors = " ", favorite = false, fileCover = " ", fileName = " ", fileBook = " ", id = uidGenerator.generateUniqueId()) {
//         this.id = id;
//         this.title = title;
//         this.description = description;
//         this.authors = authors;
//         this.favorite = favorite;
//         this.fileCover =fileCover;
//         this.fileName = fileName;
//         this.fileBook = fileBook;
//     }
// }

const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
    title: {type: String, default: 'Нечто'},
    description: {type: String, default: 'Что-то'},
    authors: {type: String, default: 'Ананимус'},
    favorite: {type: Boolean, default: false},
    fileCover: {type: String, default: ''},
    fileName: {type: String, default: ''},
    fileBook: {type: String, default: ''}
})

module.exports = model('Book', bookSchema)