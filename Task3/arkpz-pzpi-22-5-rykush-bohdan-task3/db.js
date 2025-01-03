require('dotenv').config();
const { Pool } = require('pg');

// console.log('DB Config:', {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Помилка підключення до бази даних:', err.stack);
    }
    console.log('Успішно підключено до бази даних');
    release();
});

module.exports = pool;
