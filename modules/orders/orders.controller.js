const BookModel = require('../../models/book.model')
const OrderModel = require("../../models/order.model")
const ObjectId = require('mongoose').Types.ObjectId;
const uniqid = require('uniqid');

function isValidObjectId(id){
     
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;       
        return false;
    }
    return false;
}

async function getOrders(req, res) {

}

async function initOrder(req, res) {

    const userId = req.user.id
    const books = req.body.books

    let bookIds = []
    for(book of books) {
        if(isValidObjectId(book.bookId)) {
            bookIds.push(book.bookId) 
        } else {
            res.send({
                error: true,
                message: "Invalid book id"
            })
            return
        }
    }

    let existingBooks = await BookModel.getBooksByIds(bookIds)

    if(existingBooks.length !== books.length) {
        res.send({
            error: true,
            message: "Book Id not found"
        })
        return
    }

    const orderId = uniqid('order_')

    let totalPrice = 0
    let bookDetails = []
    existingBooks.forEach(book => {
        const quantity = books.find(b => b.bookId === book.id).quantity
        totalPrice += book.price * quantity

        bookDetails.push({
            bookId: book.id,
            price: book.price,
            quantity
        })
    })

    let orderDetails = {
        orderId,
        userId,
        bookDetails,
        totalPrice
    }

    let order = await OrderModel.create(orderDetails)
    
    res.send({
        error: false,
        message: "Order Initiated",
        data: {
            order
        }
    })
}


module.exports = {
    getOrders,
    initOrder
}