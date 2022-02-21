const mysql = require('mysql2');
// const sqlPw = require('./pw.js');

require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username, 
        user: 'root',
        // Your MySQL password
        password: process.env.MYSQL_PASSWORD,
        database: 'business'
    },
    console.log('Connected to the business database')
)

module.exports = db;