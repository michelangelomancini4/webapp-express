// All'interno del file, impostiamo le configurazioni di MySQL

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Michelangelo2809!',
    database: 'db_webapp'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});
module.exports = connection;
