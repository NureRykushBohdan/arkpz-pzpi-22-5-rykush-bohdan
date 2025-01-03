const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'client_secret_540098223058-vld9qt9ku18gd1kftnll8rdl5dio7avm.apps.googleusercontent.com (1).json');

async function loadCredentials() {
    if (!fs.existsSync(CREDENTIALS_PATH)) {
        throw new Error('Файл облікових даних (client_secret.json) не знайдено. Перевірте шлях до файлу.');
    }
    return JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
}

async function loadToken() {
    if (!fs.existsSync(TOKEN_PATH)) {
        throw new Error('Файл токена (token.json) не знайдено. Виконайте авторизацію через getToken.js.');
    }
    return JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
}

async function createTransporter() {
    try {
        const credentials = await loadCredentials();
        const { client_id, client_secret, redirect_uris } = credentials.web;

        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

        const token = await loadToken();
        oAuth2Client.setCredentials(token);

        // Перевіряємо і поновлюємо access_token, якщо прострочений
        if (new Date() > new Date(token.expiry_date)) {
            const newToken = await oAuth2Client.getAccessToken();
            token.access_token = newToken.token;
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
            console.log('Токен поновлено і збережено.');
        }

        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'bogdan20001000@gmail.com',
                clientId: client_id,
                clientSecret: client_secret,
                refreshToken: token.refresh_token,
                accessToken: token.access_token,
            },
            debug: true, // Додаткові логи
        });
    } catch (error) {
        console.error('Помилка при створенні транспортера:', error.message);
        throw error;
    }
}


async function sendMail(to, subject, text) {
    try {
        const transporter = await createTransporter();
        const mailOptions = {
            from: 'bogdan20001000@gmail.com',
            to,
            subject,
            text,
        };
        const result = await transporter.sendMail(mailOptions);
        console.log('Лист успішно надіслано:', result);
    } catch (error) {
        console.error('Помилка надсилання листа:', error.message);
    }
}

module.exports = { sendMail };


module.exports = { sendMail };
