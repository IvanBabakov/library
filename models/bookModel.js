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