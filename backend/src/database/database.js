const mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    database:'ensolvers_data',
    user:'abstract-programmer',
    password:'linux',
});

module.exports = connection;