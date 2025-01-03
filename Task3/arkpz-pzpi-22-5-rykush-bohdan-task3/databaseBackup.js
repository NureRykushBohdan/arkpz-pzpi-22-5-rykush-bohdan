const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Завантаження змінних із .env

const BACKUP_DIR = path.join(__dirname, 'backups');

// Перевірка існування каталогу для резервних копій
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Абсолютний шлях до pg_dump
const PG_DUMP_PATH = `"C:\\Program Files\\PostgreSQL\\17\\bin\\pg_dump"`;

// Функція для створення резервної копії
function createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(BACKUP_DIR, `backup-${timestamp}.sql`);

    // Змінні з .env
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    // Додати пароль до змінної середовища
    const env = { ...process.env, PGPASSWORD: DB_PASSWORD };

    const command = `${PG_DUMP_PATH} -U ${DB_USER} -h ${DB_HOST} -p ${DB_PORT} -d ${DB_NAME} -F c -f "${backupFile}"`;

    return new Promise((resolve, reject) => {
        exec(command, { env }, (error, stdout, stderr) => {
            if (error) {
                return reject(`Помилка створення резервної копії: ${stderr}`);
            }
            resolve(`Резервна копія створена: ${backupFile}`);
        });
    });
}

module.exports = { createBackup };
