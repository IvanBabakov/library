const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String, default: 'Кто-то'
    },

    email: {
        type: String, default: 'email'
    },

    password: {
        type: String, default: 'password'
    }
})

module.exports = model('User', userSchema)