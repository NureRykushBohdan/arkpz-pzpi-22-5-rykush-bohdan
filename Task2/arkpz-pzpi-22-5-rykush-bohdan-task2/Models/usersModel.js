const crypto = require('crypto');
const pool = require('../db');

// Функція для хешування пароля
const hashPassword = (password) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
};

// Отримати всіх користувачів
const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM Users');
    return result.rows;
};

// Отримати користувача за ID
const getUserById = async (id) => {
    const result = await pool.query('SELECT * FROM Users WHERE user_id = $1', [id]);
    return result.rows[0];
};

// Додати нового користувача
const addUser = async (name, email, password, role) => {
    const hashedPassword = hashPassword(password); // Хешування пароля
    const result = await pool.query(
        'INSERT INTO Users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, hashedPassword, role]
    );
    return result.rows[0];
};

// Оновити роль користувача
const updateUserRole = async (id, role) => {
    const result = await pool.query(
        'UPDATE Users SET role = $1 WHERE user_id = $2 RETURNING *',
        [role, id]
    );
    return result.rows[0];
};

// Видалити користувача
const deleteUserById = async (id) => {
    const result = await pool.query('DELETE FROM Users WHERE user_id = $1 RETURNING *', [id]);
    return result.rows[0];
};

// Аутентифікація користувача
const authenticateUser = async (email, password) => {
    const hashedPassword = hashPassword(password); // Хешуємо введений пароль
    const result = await pool.query(
        'SELECT * FROM Users WHERE email = $1 AND password = $2',
        [email, hashedPassword]
    );

    if (result.rows.length > 0) {
        return result.rows[0];
    } else {
        return null;
    }
};

// Оновлення пароля користувача
const updatePassword = async (email, newPassword) => {
    const hashedPassword = hashPassword(newPassword);
    const query = 'UPDATE Users SET password = $1 WHERE email = $2 RETURNING *';
    const values = [hashedPassword, email];

    const result = await pool.query(query, values);
    return result.rows[0]; // Повертає оновлений запис користувача
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUserRole,
    deleteUserById,
    authenticateUser,
    updatePassword,
};
