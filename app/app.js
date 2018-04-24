const express = require('express');
const app = express();
const db = require('mongoose');
const booksRoutes = require('./routes/books');
const searchRoutes = require('./routes/search');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const HOST = '127.0.0.1';
const PORT = 8080;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

booksRoutes(app);
searchRoutes(app);

db.connect(`mongodb://mongo/books`, { useMongoClient: true }, function (err, db) {
  if (err) {
    console.log('ERROR: connecting to Database. ' + err);
    process.exit(1);
  }
  app.listen(PORT, function () {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
});
