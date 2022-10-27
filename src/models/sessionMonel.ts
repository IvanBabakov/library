import {Schema, model} from 'mongoose';

const sessionSchema = new Schema({
    sid: { type: String, required: true, unique: true, index: true },
    expires: { type: Number, index: true, required: true },
    data: {}
})

export = model('Session', sessionSchema)