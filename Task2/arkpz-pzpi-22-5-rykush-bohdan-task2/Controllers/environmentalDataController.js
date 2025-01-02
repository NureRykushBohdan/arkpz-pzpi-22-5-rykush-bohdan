const environmentalDataModel = require('../Models/environmentalDataModel');

// Отримати всі записи
const getAllEnvironmentalData = async (req, res) => {
    try {
        const data = await environmentalDataModel.getAllEnvironmentalData();
        res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка отримання даних');
    }
};

// Додати новий запис
const addEnvironmentalData = async (req, res) => {
    const { device_id, data_type, value, timestamp } = req.body;
    try {
        const data = await environmentalDataModel.addEnvironmentalData(device_id, data_type, value, timestamp);
        res.status(201).json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка додавання даних');
    }
};

// Видалити запис за ID
const deleteEnvironmentalDataById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await environmentalDataModel.deleteEnvironmentalDataById(id);
        if (!data) {
            return res.status(404).send('Запис не знайдено');
        }
        res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка видалення даних');
    }
};

// Отримати записи, відсортовані за часом
const getSortedEnvironmentalData = async (req, res) => {
    try {
        const data = await environmentalDataModel.getSortedEnvironmentalData();
        res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка сортування даних');
    }
};

module.exports = {
    getAllEnvironmentalData,
    addEnvironmentalData,
    deleteEnvironmentalDataById,
    getSortedEnvironmentalData,
};
