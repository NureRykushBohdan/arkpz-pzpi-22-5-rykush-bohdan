const locationsModel = require('../Models/locationsModel');

// Додати нову локацію
const addLocation = async (req, res) => {
    const { name, latitude, longitude } = req.body;
    try {
        const location = await locationsModel.addLocation(name, latitude, longitude);
        res.status(201).json(location);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка додавання локації');
    }
};

// Видалити локацію за ID
const deleteLocationById = async (req, res) => {
    const { id } = req.params;
    try {
        const location = await locationsModel.deleteLocationById(id);
        if (!location) {
            return res.status(404).send('Локація не знайдена');
        }
        res.status(200).json(location);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка видалення локації');
    }
};

// Отримати всі локації
const getAllLocations = async (req, res) => {
    try {
        const locations = await locationsModel.getAllLocations();
        res.status(200).json(locations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка отримання локацій');
    }
};

// Отримати локацію за ID
const getLocationById = async (req, res) => {
    const { id } = req.params;
    try {
        const location = await locationsModel.getLocationById(id);
        if (!location) {
            return res.status(404).send('Локація не знайдена');
        }
        res.status(200).json(location);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка отримання локації');
    }
};

module.exports = {
    addLocation,
    deleteLocationById,
    getAllLocations,
    getLocationById,
};
