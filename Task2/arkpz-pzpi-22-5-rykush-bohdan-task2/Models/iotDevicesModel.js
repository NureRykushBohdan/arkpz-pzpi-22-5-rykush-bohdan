const pool = require('../db');

// Додати новий пристрій
const addDevice = async (location_id, device_type, status) => {
    const result = await pool.query(
        'INSERT INTO IoT_Devices (location_id, device_type, status, last_updated) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [location_id, device_type, status]
    );
    return result.rows[0];
};

// Видалити пристрій за ID
const deleteDeviceById = async (device_id) => {
    const result = await pool.query(
        'DELETE FROM IoT_Devices WHERE device_id = $1 RETURNING *',
        [device_id]
    );
    return result.rows[0];
};

// Оновити статус пристрою
const updateDeviceStatus = async (device_id, status) => {
    const result = await pool.query(
        'UPDATE IoT_Devices SET status = $1, last_updated = NOW() WHERE device_id = $2 RETURNING *',
        [status, device_id]
    );
    return result.rows[0];
};

// Отримати всі пристрої
const getAllDevices = async () => {
    const result = await pool.query('SELECT * FROM IoT_Devices');
    return result.rows;
};

module.exports = {
    addDevice,
    deleteDeviceById,
    updateDeviceStatus,
    getAllDevices,
};
