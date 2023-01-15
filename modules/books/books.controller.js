const Book = require("../../models/book.model")

async function getBooks(req, res) {

    const books = await Book.find({visibility: true})

    res.send({
        error: false,
        data: {
            books
        }
    })

}

async function getBookByISBN13(req, res) {

    const isbn_13 = req.params.isbn_13

    const book = await Book.find({isbn_13: isbn_13, visibility: true})

    res.send({
        error: false,
        data: {
            book
        }
    })

}

async function getFilters(req, res) {

    let filters = {
        "price_range": {
            "heading": 'Price Range',
            "start": 0,
            "end": 5000
        },
        "discount_range": {
            "heading": 'Discount Range',
            "start": 0,
            "end": 80
        },
        "binding": {
            "heading": "Binding",
            "list": [
                { "name": "Paper Back", "code": "PAPERBACK" },
                { "name": "Hard Cover", "code": "HARDCOVER" },
                { "name": "Other", "code": "OTHER" }
            ]
        },
        "language": {
            "heading": "Language",
            "list": [
                { "name": "English", "code": "english" },
                { "name": "Marathi", "code": "marathi" },
                { "name": "Hindi", "code": "hindi" }
            ]
        }
    }

    res.send({
        error: false,
        data: {
            filters
        }
    })
}


module.exports = {
    getBooks,
    getBookByISBN13,
    getFilters
}