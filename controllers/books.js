require('../models/book');
var db = require('mongoose');
var Book = db.model('Book');

module.exports.list = (req, res) => {
	Book.find({ uuid: req.headers.uuid }, function (err, books) {
		if (err) {
			res.send(err);
		} else {
			res.json(books);
		}
	});
};

module.exports.find = (req, res) => {
	Book.findById({ uuid: req.headers.uuid, _id: req.params.id }, function (err, book) {
		if (err) {
			res.send(err);
		} else {
			res.json(book);
		}
	});
};

module.exports.create = (req, res) => {
	var body = req.body;
	body['uuid'] = req.headers.uuid;
	var newBook = new Book(body);
	newBook.save(function (err, book) {
		if (err) {
			res.send(err);
		} else {
			res.statusCode = 201;
			res.json(book);
		}
	});
};

module.exports.update = (req, res) => {
	Book.findOneAndUpdate({ uuid: req.headers.uuid, _id: req.params.id }, req.body, { new: true }, function (err, book) {
		if (err) {
			res.send(err);
		} else {
			res.json(book);
		}
	});
};

module.exports.delete = (req, res) => {
	Book.remove({ uuid: req.headers.uuid, _id: req.params.id }, function (err, book) {
		if (err) {
			res.send(err);
		} else {
			res.end()
		}
	});
};