const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'client_secret_540098223058-j6mm8h3fg5t856tvi3n4hkqdkn752stq.apps.googleusercontent.com (2).json');

async function createTransporter() {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
    const { client_id, client_secret, redirect_uris } = credentials.installed;

    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    oAuth2Client.setCredentials(token);

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
    });
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
        console.log('Лист успішно надіслано: ', result);
    } catch (error) {
        console.error('Помилка надсилання листа: ', error);
    }
}

module.exports = { sendMail };
