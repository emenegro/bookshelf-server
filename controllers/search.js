const https = require('https');
const objectMapper = require('object-mapper');

module.exports.search = (req, res) => {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=' + req.query.q;
    https.get(url, (gbooksRes) => {
        const { statusCode } = gbooksRes;
        if (gbooksRes.error) {
            res.statusCode = statusCode;
            res.error = gbooksRes.error;
            res.end();
        } else {
            let rawData = '';
            gbooksRes.on('data', (chunk) => {
                rawData += chunk;
            });
            gbooksRes.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    const list = mapList(parsedData);
                    res.send(list);
                } catch (e) {
                    res.error = e;
                }
            });
        }
    }).on('error', (e) => {
        res.error = e;
    });
};

function mapList(json) {
    var list = []
    json.items.forEach(element => {
        list.push(mapObject(element.volumeInfo));
    });
    return list;
}

function mapObject(json) {
    const mapping = {
        "title": "title",
        "authors[]": "authors",
        "publiser": "publisher",
        "publishDate": "publishDate",
        "description": "description",
        "pageCount": "pageCount",
        "imageLinks.thumbnail": "coverImageUrl"
    }
    return objectMapper(json, mapping);
}