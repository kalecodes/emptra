const mysql = require('mysql2');
const sqlPw = require('./pw.js');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username, 
        user: 'root',
        // Your MySQL password
        password: sqlPw,
        database: 'business'
    },
    console.log('Connected to the election database')
)

module.exports = db;