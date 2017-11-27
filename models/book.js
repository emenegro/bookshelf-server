var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: { type: String },
    author: { type: String },
    coverImage: { type: String },
    description: { type: String },
    publisher: { type: String },
    publishedDate: { type: String },
    pageCount: { type: Number }
});

mongoose.model('Book', bookSchema);
