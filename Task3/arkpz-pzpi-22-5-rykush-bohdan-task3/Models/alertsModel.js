const pool = require('../db');

// Отримати всі сповіщення
const getAllAlerts = async () => {
    const result = await pool.query('SELECT * FROM Alerts');
    return result.rows;
};

// Отримати сповіщення за ID користувача
const getAlertsByUserId = async (user_id) => {
    const result = await pool.query('SELECT * FROM Alerts WHERE user_id = $1', [user_id]);
    return result.rows;
};

// Додати нове сповіщення
const addAlert = async (user_id, data_id, alert_type) => {
    const result = await pool.query(
        'INSERT INTO Alerts (user_id, data_id, alert_type, timestamp) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [user_id, data_id, alert_type]
    );
    return result.rows[0];
};



// Видалити сповіщення за ID
const deleteAlertById = async (alert_id) => {
    const result = await pool.query('DELETE FROM Alerts WHERE alert_id = $1 RETURNING *', [alert_id]);
    return result.rows[0];
};

module.exports = {
    getAllAlerts,
    getAlertsByUserId,
    addAlert,
    deleteAlertById,
};
