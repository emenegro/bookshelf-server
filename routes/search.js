'use strict';
module.exports = function (app) {
    var search = require('../controllers/search');

    app.route('/search')
        .get(search.search)
};
