const mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  database: "ensolvers_data",
  user: "root",
  password: "12345678",
});

module.exports = connection;
