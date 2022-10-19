const user = require('./user/user.js')
const book = require('./books/books.js')


module.exports = function(app,users,books) {

    user(app,users)  // user
    book(app,books)  // book
}