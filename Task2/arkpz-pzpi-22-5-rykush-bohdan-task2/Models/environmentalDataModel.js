const pool = require('../db');

// Отримати всі записи
const getAllEnvironmentalData = async () => {
    const result = await pool.query('SELECT * FROM Environmental_Data');
    return result.rows;
};

// Додати новий запис
const addEnvironmentalData = async (device_id, data_type, value) => {
    const result = await pool.query(
        'INSERT INTO Environmental_Data (device_id, data_type, value, timestamp) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [device_id, data_type, value]
    );
    return result.rows[0];
};

// Видалити запис за ID
const deleteEnvironmentalDataById = async (id) => {
    const result = await pool.query(
        'DELETE FROM Environmental_Data WHERE data_id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

// Отримати записи, відсортовані за часом
const getSortedEnvironmentalData = async () => {
    const result = await pool.query('SELECT * FROM Environmental_Data ORDER BY timestamp DESC');
    return result.rows;
};

module.exports = {
    getAllEnvironmentalData,
    addEnvironmentalData,
    deleteEnvironmentalDataById,
    getSortedEnvironmentalData,
};
