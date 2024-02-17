const mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    database:'ensolvers_data',
    user:'root',
    password:'root',
});

module.exports = connection;