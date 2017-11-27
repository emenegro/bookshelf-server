const http = require('http');
const express = require('express'),
      app = express()
const db = require('mongoose');
const books = require('./controllers/books');
const booksRoutes = require('./routes/books');
const searchRoutes = require('./routes/search');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

booksRoutes(app);
searchRoutes(app);

db.connect('mongodb://localhost:27017/books', function (err, db) {
  if (err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function () {
    console.log("Books server running on http://localhost:3000");
  });
});
