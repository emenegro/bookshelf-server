var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookSchema = new Schema({
    uuid: { type: String },
    title: { type: String },
    authors: { type: [String] },
    coverImageUrl: { type: String },
    description: { type: String },
    publisher: { type: String },
    publishedDate: { type: String },
    pageCount: { type: Number }
});

mongoose.model('Book', bookSchema);
