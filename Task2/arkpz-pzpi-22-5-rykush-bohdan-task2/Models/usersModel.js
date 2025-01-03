const pool = require('../db');

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
    const result = await pool.query(
        'INSERT INTO Users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, password, role]
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

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUserRole,
    deleteUserById,
};
