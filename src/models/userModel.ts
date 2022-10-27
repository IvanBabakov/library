import {Schema, model} from 'mongoose';

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

export = model('User', userSchema)