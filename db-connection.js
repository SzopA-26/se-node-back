var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'residentialservice'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!");
});

module.exports = connection;