const usersModel = require('../Models/usersModel');
const { sendEmail } = require('../gmailService');


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

// Аутентифікація користувача
const authenticateUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usersModel.authenticateUser(email, password);
        if (user) {
            req.session.user = { id: user.user_id, role: user.role }; // Зберігаємо користувача в сесії
            res.status(200).json({
                message: 'Успішна авторизація',
                user: {
                    id: user.user_id,
                    name: user.name,
                    role: user.role,
                },
            });
        } else {
            res.status(401).json({ message: 'Невірний email або пароль' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Внутрішня помилка сервера');
    }
};

// Відправка тимчасового паролю
const sendTemporaryPassword = async (req, res) => {
    const { email } = req.body;
    const temporaryPassword = Math.random().toString(36).slice(-8); // Генерація тимчасового пароля

    try {
        // Оновлення пароля у базі даних
        const updatedUser = await usersModel.updatePassword(email, temporaryPassword);
        if (!updatedUser) {
            return res.status(404).json({ message: 'Користувача з таким email не знайдено' });
        }

        // Відправлення тимчасового пароля на email
        await sendEmail(
            email,
            'Ваш тимчасовий пароль',
            `Ваш тимчасовий пароль: ${temporaryPassword}`
        );

        res.status(200).json({ message: 'Тимчасовий пароль надіслано' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUserRole,
    deleteUserById,
    authenticateUser,
    sendTemporaryPassword,
};
