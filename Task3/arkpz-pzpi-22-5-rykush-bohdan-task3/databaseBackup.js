const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Завантаження змінних із .env

const BACKUP_DIR = path.join(__dirname, 'backups');

if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const PG_DUMP_PATH = "C:\\Program Files\\PostgreSQL\\17\\bin\\pg_dump.exe";

async function createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(BACKUP_DIR, `backup-${timestamp}.sql`);

    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
    const env = { ...process.env, PGPASSWORD: DB_PASSWORD };

    const args = [
        '-U', DB_USER,
        '-h', DB_HOST,
        '-p', DB_PORT,
        '-d', DB_NAME,
        '-F', 'c',
        '-f', backupFile,
    ];
    
    return new Promise((resolve, reject) => {
        execFile(PG_DUMP_PATH, args, { env }, (error, stdout, stderr) => {
            if (error) {
                console.error('Помилка виконання команди:', error.message);
                console.error('Стандартний потік помилок:', stderr);
                return reject(`Помилка створення резервної копії: ${stderr || error.message}`);
            }
            console.log('Результат виконання:', stdout);
            resolve(`Резервна копія створена: ${backupFile}`);
        });
    });
    
}

module.exports = { createBackup };
