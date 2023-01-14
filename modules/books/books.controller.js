const books = require('./books.json')

async function getBooks(req, res) {


    res.send({
        error: false,
        data: books
    })

}


module.exports = {
    getBooks
}