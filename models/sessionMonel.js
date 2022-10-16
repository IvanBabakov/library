const {Schema, model} = require('mongoose');

const sessionSchema = new Schema({
    sid: { type: String, required: true, unique: true, index: true },
    expires: { type: Number, index: true, required: true },
    data: {}
})

module.exports = model('Session', sessionSchema)