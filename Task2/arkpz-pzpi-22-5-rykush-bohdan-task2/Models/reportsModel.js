const pool = require('../db');

// Додати новий звіт
const addReport = async (user_id, location_id, report_data) => {
    const result = await pool.query(
        'INSERT INTO Reports (user_id, location_id, report_data, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [user_id, location_id, report_data]
    );
    return result.rows[0];
};

// Видалити звіт за ID
const deleteReportById = async (report_id) => {
    const result = await pool.query(
        'DELETE FROM Reports WHERE report_id = $1 RETURNING *',
        [report_id]
    );
    return result.rows[0];
};

// Отримати всі звіти
const getAllReports = async () => {
    const result = await pool.query('SELECT * FROM Reports');
    return result.rows;
};

// Отримати звіт за ID
const getReportById = async (report_id) => {
    const result = await pool.query(
        'SELECT * FROM Reports WHERE report_id = $1',
        [report_id]
    );
    return result.rows[0];
};

module.exports = {
    addReport,
    deleteReportById,
    getAllReports,
    getReportById,
};
