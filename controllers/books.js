require('../models/book');
var db = require('mongoose');
var Book = db.model('Book');

module.exports.list = (req, res) => {
	Book.find(function (err, books) {
		if (err) {
			res.send(err);
		} else {
			res.json(books);
		}
	});
};

module.exports.find = (req, res) => {
	Book.findById(req.params.id, function (err, book) {
		if (err) {
			res.send(err);
		} else {
			res.json(book);
		}
	});
};

module.exports.create = (req, res) => {
	var newBook = new Book(req.body);
	newBook.save(function (err, book) {
		if (err) {
			res.send(err);
		} else {
			res.json(book);
		}
	});
};

module.exports.update = (req, res) => {
	Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, book) {
		if (err) {
			res.send(err);
		} else {
			res.json(book);
		}
	});
};

module.exports.delete = (req, res) => {
	Book.remove({ _id: req.params.id }, function (err, book) {
		if (err) {
			res.send(err);
		} else {
			res.end()
		}
	});
};