var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: { type: String },
    authors: { type: [String] },
    coverImageUrl: { type: String },
    description: { type: String },
    publisher: { type: String },
    publishedDate: { type: String },
    pageCount: { type: Number },
    isRead: { type: Boolean, default: false }
});

mongoose.model('Book', bookSchema);
