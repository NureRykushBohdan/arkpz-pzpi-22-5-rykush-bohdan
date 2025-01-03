const alertsModel = require('../Models/alertsModel');

// Отримати всі сповіщення
const getAllAlerts = async (req, res) => {
    try {
        const alerts = await alertsModel.getAllAlerts();
        res.status(200).json(alerts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка отримання сповіщень');
    }
};

// Отримати сповіщення за ID користувача
const getAlertsByUserId = async (req, res) => {
    const { user_id } = req.params;
    try {
        const alerts = await alertsModel.getAlertsByUserId(user_id);
        res.status(200).json(alerts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка отримання сповіщень');
    }
};

// Додати нове сповіщення
const addAlert = async (req, res) => {
    const { user_id, data_id, alert_type } = req.body;
    try {
        const alert = await alertsModel.addAlert(user_id, data_id, alert_type);
        res.status(201).json(alert);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка додавання сповіщення');
    }
};



// Видалити сповіщення за ID
const deleteAlertById = async (req, res) => {
    const { id } = req.params;
    try {
        const alert = await alertsModel.deleteAlertById(id);
        if (!alert) {
            return res.status(404).send('Сповіщення не знайдено');
        }
        res.status(200).json(alert);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка видалення сповіщення');
    }
};

module.exports = {
    getAllAlerts,
    getAlertsByUserId,
    addAlert,
    deleteAlertById,
};
