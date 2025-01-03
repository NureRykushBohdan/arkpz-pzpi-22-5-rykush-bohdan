const express = require('express');
const usersController = require('./Controllers/usersController');
const environmentalDataController = require('./Controllers/environmentalDataController');
const alertsController = require('./Controllers/alertsController');
const iotDevicesController = require('./Controllers/iotDevicesController');
const locationsController = require('./Controllers/locationsController');
const reportsController = require('./Controllers/reportsController');

const app = express();
app.use(express.json()); // Для роботи з JSON-запитами

// Маршрути для роботи з користувачами
app.get('/api/users', usersController.getAllUsers);
app.get('/api/users/:id', usersController.getUserById);
app.post('/api/users', usersController.addUser);
app.put('/api/users/:id/role', usersController.updateUserRole);
app.delete('/api/users/:id', usersController.deleteUserById);

// Маршрути для роботи з Environmental_Data
app.get('/api/environmental_data', environmentalDataController.getAllEnvironmentalData);
app.post('/api/environmental_data', environmentalDataController.addEnvironmentalData);
app.delete('/api/environmental_data/:id', environmentalDataController.deleteEnvironmentalDataById);
app.get('/api/environmental_data/sorted', environmentalDataController.getSortedEnvironmentalData);

// Маршрути для роботи з alerts
app.get('/api/alerts', alertsController.getAllAlerts); 
app.get('/api/alerts/user/:user_id', alertsController.getAlertsByUserId); 
app.post('/api/alerts', alertsController.addAlert); 
app.delete('/api/alerts/:id', alertsController.deleteAlertById); 

// Маршрути для роботи з IoT_Devices
app.post('/api/iot_devices', iotDevicesController.addDevice); 
app.delete('/api/iot_devices/:id', iotDevicesController.deleteDeviceById);
app.put('/api/iot_devices/:id/status', iotDevicesController.updateDeviceStatus); 
app.get('/api/iot_devices', iotDevicesController.getAllDevices); 

// Маршрути для роботи з Locations
app.post('/api/locations', locationsController.addLocation); 
app.delete('/api/locations/:id', locationsController.deleteLocationById); 
app.get('/api/locations', locationsController.getAllLocations); 
app.get('/api/locations/:id', locationsController.getLocationById); 

// Маршрути для роботи з Reports
app.post('/api/reports', reportsController.addReport); 
app.delete('/api/reports/:id', reportsController.deleteReportById); 
app.get('/api/reports', reportsController.getAllReports); 
app.get('/api/reports/:id', reportsController.getReportById); 

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});
