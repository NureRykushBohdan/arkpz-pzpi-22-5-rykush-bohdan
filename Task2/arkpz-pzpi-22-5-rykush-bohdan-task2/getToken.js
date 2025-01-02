const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const CREDENTIALS_PATH = 'client_secret_540098223058-j6mm8h3fg5t856tvi3n4hkqdkn752stq.apps.googleusercontent.com (2).json';
const TOKEN_PATH = './token.json';

async function generateToken() {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
    const { client_id, client_secret, redirect_uris } = credentials.installed;

    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/gmail.send'],
    });

    console.log('Перейдіть за наступним посиланням, щоб авторизувати доступ:');
    console.log(authUrl);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('Введіть код з авторизації тут: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) {
                console.error('Помилка при отриманні токена:', err);
                return;
            }
            oAuth2Client.setCredentials(token);
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
            console.log('Токен збережено до', TOKEN_PATH);
        });
    });
}

generateToken();
