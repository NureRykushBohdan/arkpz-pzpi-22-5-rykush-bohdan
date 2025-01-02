const iotDevicesModel = require('../Models/iotDevicesModel');

// Додати новий пристрій
const addDevice = async (req, res) => {
    const { location_id, device_type, status } = req.body;
    try {
        const device = await iotDevicesModel.addDevice(location_id, device_type, status);
        res.status(201).json(device);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка додавання пристрою');
    }
};

// Видалити пристрій за ID
const deleteDeviceById = async (req, res) => {
    const { id } = req.params;
    try {
        const device = await iotDevicesModel.deleteDeviceById(id);
        if (!device) {
            return res.status(404).send('Пристрій не знайдено');
        }
        res.status(200).json(device);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка видалення пристрою');
    }
};

// Оновити статус пристрою
const updateDeviceStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const device = await iotDevicesModel.updateDeviceStatus(id, status);
        if (!device) {
            return res.status(404).send('Пристрій не знайдено');
        }
        res.status(200).json(device);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка оновлення статусу пристрою');
    }
};

// Отримати всі пристрої
const getAllDevices = async (req, res) => {
    try {
        const devices = await iotDevicesModel.getAllDevices();
        res.status(200).json(devices);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Помилка отримання пристроїв');
    }
};

module.exports = {
    addDevice,
    deleteDeviceById,
    updateDeviceStatus,
    getAllDevices,
};
