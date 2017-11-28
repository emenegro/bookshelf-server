const express = require('express'),
  app = express()
const db = require('mongoose');
const booksRoutes = require('./routes/books');
const searchRoutes = require('./routes/search');
const bodyParser = require('body-parser');
const HOST = '127.0.0.1';
const PORT = 8080;
const MONGO_PORT = 27017;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(uuidChecker);

booksRoutes(app);
searchRoutes(app);

db.connect(`mongodb://${HOST}:${MONGO_PORT}/books`, function (err, db) {
  if (err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(PORT, function () {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
});

// UUID checker middleware
function uuidChecker(req, res, next) {
  if (req.headers.uuid) {
    next()
  } else {
    res.statusCode = 400;
    res.end('Missing "uuid" header in request');
  }
}
