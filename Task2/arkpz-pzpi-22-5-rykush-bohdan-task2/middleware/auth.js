// Middleware для перевірки аутентифікації
const authenticateMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        req.user = req.session.user; // Додаємо користувача до req
        next();
    } else {
        res.status(401).json({ message: 'Необхідно увійти в систему' });
    }
};

// Middleware для перевірки ролі користувача
const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (req.user && req.user.role === requiredRole) {
            next();
        } else {
            res.status(403).json({ message: 'Доступ заборонено' });
        }
    };
};

module.exports = {
    authenticateMiddleware,
    roleMiddleware,
};
