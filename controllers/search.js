
module.exports.search = (req, res) => {
    let q = req.query.q
    res.send('Searching "' + q + '" in Google Books')
};