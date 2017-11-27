'use strict';
module.exports = function(app) {
    var books = require('../controllers/books');

    app.route('/books')
        .get(books.list)
        .post(books.create);

    app.route('/books/:id')
        .get(books.find)
        .put(books.update)
        .delete(books.delete);
};
