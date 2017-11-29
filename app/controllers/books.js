require('../models/book');
var db = require('mongoose');
var Book = db.model('Book');

module.exports.list = (req, res) => {
	Book.find({ uuid: req.headers.uuid }, function (err, books) {
		if (err) {
			fillError500Res(res, "Error listing books");
		} else {
			res.json(books);
		}
	});
};

module.exports.find = (req, res) => {
	Book.findById({ uuid: req.headers.uuid, _id: req.params.id }, function (err, book) {
		if (err) {
			fillError500Res(res, "Error finding book");
		} else {
			fillBookRes(res, book);
		}
	});
};

module.exports.create = (req, res) => {
	var body = req.body;
	body['uuid'] = req.headers.uuid;
	var newBook = new Book(body);
	newBook.save(function (err, book) {
		if (err) {
			fillError500Res(res, "Error creating book");
		} else {
			res.status(201).json(book);
		}
	});
};

module.exports.update = (req, res) => {
	Book.findOneAndUpdate({ uuid: req.headers.uuid, _id: req.params.id }, req.body, { new: true }, function (err, book) {
		if (err) {
			fillError500Res(res, "Error updating book");
		} else {
			fillBookRes(res, book);
		}
	});
};

module.exports.delete = (req, res) => {
	Book.remove({ uuid: req.headers.uuid, _id: req.params.id }, function (err, book) {
		if (err) {
			fillError500Res(res, "Error deleting book");
		} else {
			res.end()
		}
	});
};

// Helpers
function fillBookRes(res, book) {
	if (book != null) {
		res.json(book);
	} else {
		res.statusCode = 404;
		res.end()
	}
}

function fillError500Res(res, message) {
	res.status(500).end(message);
}