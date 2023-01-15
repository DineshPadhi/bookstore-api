const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String },
    discount: { type: Number },
    price: { type: Number, required: true },
    released_date: { type: Date, required: true },
    binding: {
        type: String,
        enum : ['PAPERBACK','HARDCOVER', 'OTHER'],
        default: 'OTHER'
    },
    height: { type: String },
    width: { type: String },
    weight: { type: String },
    depth: { type: Number },
    isbn_13: { type: String, required: true },
    isbn_10: { type: String, required: true },
    language: {
        type: String,
        enum : ['english','marathi', 'hindi'],
        required: true
    },
    returnable: { type: Boolean, required: true },
    img_url: { type: String, required: true }
},{
    collation: { locale: 'en_US', strength: 1 },
    usePushEach: true,
    timestamps : {createdAt: 'created_at', updatedAt: 'updated_at'}
},)

module.exports = mongoose.model('Book', bookSchema)