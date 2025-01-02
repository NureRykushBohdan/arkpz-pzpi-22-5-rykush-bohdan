const pool = require('../db');

// Додати нову локацію
const addLocation = async (name, latitude, longitude) => {
    const result = await pool.query(
        'INSERT INTO Locations (name, latitude, longitude) VALUES ($1, $2, $3) RETURNING *',
        [name, latitude, longitude]
    );
    return result.rows[0];
};

// Видалити локацію за ID
const deleteLocationById = async (location_id) => {
    const result = await pool.query(
        'DELETE FROM Locations WHERE location_id = $1 RETURNING *',
        [location_id]
    );
    return result.rows[0];
};

// Отримати всі локації
const getAllLocations = async () => {
    const result = await pool.query('SELECT * FROM Locations');
    return result.rows;
};

// Отримати локацію за ID
const getLocationById = async (location_id) => {
    const result = await pool.query(
        'SELECT * FROM Locations WHERE location_id = $1',
        [location_id]
    );
    return result.rows[0];
};

module.exports = {
    addLocation,
    deleteLocationById,
    getAllLocations,
    getLocationById,
};
