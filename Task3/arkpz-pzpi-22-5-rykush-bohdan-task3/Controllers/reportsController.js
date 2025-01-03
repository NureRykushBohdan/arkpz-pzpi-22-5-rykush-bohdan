const reportsModel = require('../Models/reportsModel');

// Додати новий звіт
const addReport = async (req, res) => {
    const { user_id, location_id, report_data } = req.body;
    try {
        const report = await reportsModel.addReport(user_id, location_id, report_data);
        res.status(201).json(report);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка додавання звіту');
    }
};

// Видалити звіт за ID
const deleteReportById = async (req, res) => {
    const { id } = req.params;
    try {
        const report = await reportsModel.deleteReportById(id);
        if (!report) {
            return res.status(404).send('Звіт не знайдено');
        }
        res.status(200).json(report);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка видалення звіту');
    }
};

// Отримати всі звіти
const getAllReports = async (req, res) => {
    try {
        const reports = await reportsModel.getAllReports();
        res.status(200).json(reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка отримання звітів');
    }
};

// Отримати звіт за ID
const getReportById = async (req, res) => {
    const { id } = req.params;
    try {
        const report = await reportsModel.getReportById(id);
        if (!report) {
            return res.status(404).send('Звіт не знайдено');
        }
        res.status(200).json(report);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка отримання звіту');
    }
};

module.exports = {
    addReport,
    deleteReportById,
    getAllReports,
    getReportById,
};
