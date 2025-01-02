const usersModel = require('../Models/usersModel');

// Отримати всіх користувачів
const getAllUsers = async (req, res) => {
    try {
        const users = await usersModel.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Внутрішня помилка сервера');
    }
};

// Отримати користувача за ID
const getUserById = async (req, res) => {
    try {
        const user = await usersModel.getUserById(req.params.id);
        if (!user) {
            return res.status(404).send('Користувача не знайдено');
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Внутрішня помилка сервера');
    }
};

// Додати нового користувача
const addUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await usersModel.addUser(name, email, password, role);
        res.status(201).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Внутрішня помилка сервера');
    }
};

// Оновити роль користувача
const updateUserRole = async (req, res) => {
    const { role } = req.body;
    try {
        const user = await usersModel.updateUserRole(req.params.id, role);
        if (!user) {
            return res.status(404).send('Користувача не знайдено');
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Внутрішня помилка сервера');
    }
};

// Видалити користувача
const deleteUserById = async (req, res) => {
    try {
        const user = await usersModel.deleteUserById(req.params.id);
        if (!user) {
            return res.status(404).send('Користувача не знайдено');
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Внутрішня помилка сервера');
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUserRole,
    deleteUserById,
};
