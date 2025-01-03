const path = require('path');
const fs = require('fs');
const { createBackup, restoreBackup } = require('./databaseBackup');

// Створення резервної копії
async function backupDatabase(req, res) {
    try {
        const result = await createBackup();
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Відновлення бази даних
async function restoreDatabase(req, res) {
    const backupFile = path.join(__dirname, 'backups', req.body.filename);

    if (!fs.existsSync(backupFile)) {
        return res.status(400).json({ error: 'Файл резервної копії не знайдено.' });
    }

    try {
        const result = await restoreBackup(backupFile);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = { backupDatabase, restoreDatabase };
