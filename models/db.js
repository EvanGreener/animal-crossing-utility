'user strict'

var mysql = require('mysql')

//local mysql db connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'evan',
    password: 'mysql123',
    database: 'animal_crossing',
})

connection.connect(function (err) {
    if (err) throw err
})

module.exports = connection
