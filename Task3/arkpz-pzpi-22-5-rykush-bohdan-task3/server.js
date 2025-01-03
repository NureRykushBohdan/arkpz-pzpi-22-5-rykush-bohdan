const express = require('express');
const session = require('express-session');
const { sendMail } = require('./gmailService');
const bodyParser = require('body-parser');




const { backupDatabase, restoreDatabase } = require('./adminController');
const usersController = require('./Controllers/usersController');
const { authenticateMiddleware, roleMiddleware } = require('./middleware/auth');
const environmentalDataController = require('./Controllers/environmentalDataController');
const alertsController = require('./Controllers/alertsController');
const iotDevicesController = require('./Controllers/iotDevicesController');
const locationsController = require('./Controllers/locationsController');
const reportsController = require('./Controllers/reportsController');

const app = express();
app.use(bodyParser.json());
app.use(express.json()); // Для роботи з JSON-запитами







const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');

const CLIENT_SECRET_PATH = path.join(__dirname, 'client_secret_540098223058-vld9qt9ku18gd1kftnll8rdl5dio7avm.apps.googleusercontent.com (1).json');

const credentials = JSON.parse(fs.readFileSync(CLIENT_SECRET_PATH, 'utf-8'));
const { client_id, client_secret, redirect_uris } = credentials.web;



const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
);


sendMail('bohdan.rykush@nure.ua', 'Тест', 'Це тестове повідомлення для перевірки.')
    .then(() => console.log('Лист надіслано!'))
    .catch(err => console.error('Помилка:', err));

//database
app.post('/api/backup', backupDatabase);
app.post('/api/restore', restoreDatabase);

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



// Налаштування сесій

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'default_secret_key', // Використовуємо ключ із .env
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false, // Для HTTPS змінити на true
            maxAge: 3600000, // Тривалість сесії (1 година)
        },
    })
);



// Маршрут для аутентифікації

app.post('/api/authenticate', usersController.authenticateUser);
app.get('/api/protected', authenticateMiddleware, (req, res) => {
    res.status(200).json({ message: `Привіт, ${req.user.role} користувач!` });
});


// Захищений маршрут для адміністраторів
app.get('/api/admin', authenticateMiddleware, roleMiddleware('admin'), (req, res) => {
    res.status(200).json({ message: 'Доступ дозволено тільки адміністраторам' });
});

app.get('/api/check-auth', (req, res) => {
    if (req.session && req.session.user) {
        res.status(200).json({
            message: 'Авторизований',
            user: req.session.user,
        });
    } else {
        res.status(401).json({ message: 'Не авторизований' });
    }
});

//send-password
app.post('/api/send-password', usersController.sendTemporaryPassword);

app.get('/', (req, res) => {
    const code = req.query.code;

    if (!code) {
        res.send('Код авторизації не надано.');
        return;
    }

    // Обробка коду авторизації
    oAuth2Client.getToken(code, (err, token) => {
        if (err) {
            console.error('Помилка отримання токена:', err);
            res.send('Не вдалося отримати токен.');
            return;
        }
        oAuth2Client.setCredentials(token);

        // Збереження токена у файл
        fs.writeFileSync('token.json', JSON.stringify(token));
        res.send('Токен успішно отримано та збережено!');
    });
});


// Запуск сервера
const PORT = process.env.PORT || 5000;

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});