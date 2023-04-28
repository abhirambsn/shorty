const mongoose = require('mongoose')

const urlScehema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    shortened_id: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Url', urlScehema)