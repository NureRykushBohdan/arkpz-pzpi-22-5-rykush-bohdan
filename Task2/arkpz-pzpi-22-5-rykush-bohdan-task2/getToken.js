const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const CREDENTIALS_PATH = 'client_secret_540098223058-vld9qt9ku18gd1kftnll8rdl5dio7avm.apps.googleusercontent.com (1).json';
const TOKEN_PATH = './token.json';

async function generateToken() {
    try {
        // Завантаження облікових даних
        if (!fs.existsSync(CREDENTIALS_PATH)) {
            throw new Error(`Файл облікових даних (${CREDENTIALS_PATH}) не знайдено.`);
        }
        const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
        const { client_id, client_secret, redirect_uris } = credentials.web;

        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

        // Генерація посилання на авторизацію
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline', // Забезпечує отримання refresh_token
            scope: ['https://www.googleapis.com/auth/gmail.send'],
        });

        console.log('Перейдіть за наступним посиланням, щоб авторизувати доступ:');
        console.log(authUrl);

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        // Отримання коду авторизації
        rl.question('Введіть код з авторизації тут: ', async (code) => {
            rl.close();
            try {
                const { tokens } = await oAuth2Client.getToken(code);
                oAuth2Client.setCredentials(tokens);

                if (!tokens.refresh_token) {
                    throw new Error('Не отримано refresh_token. Видаліть доступ у Google Account Permissions і спробуйте знову.');
                }

                // Збереження токена
                fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
                console.log('Токен успішно збережено до', TOKEN_PATH);
                console.log('Отриманий токен:', tokens);
            } catch (error) {
                console.error('Помилка при отриманні токена:', error.message);
            }
        });
    } catch (error) {
        console.error('Помилка ініціалізації:', error.message);
    }
}

generateToken();
