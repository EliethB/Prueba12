const mysql = require('mysql2');

var connection = mysql.createConnection({
    host:'localhost',
    database:'ensolvers_data',
    user:'abstract-programmer',
    password:'linux',
});

module.exports = connection;