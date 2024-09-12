const { body, validationResult } = require('express-validator');

const validateAuth = [
    body('credential').notEmpty().withMessage('Имя пользователя или почта должны быть обязательно указаны'),
    body('password').notEmpty().withMessage('Пароль должен быть обязательно'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateAdminAuth = [
    body('host').notEmpty().withMessage('Host должен быть указан'),
    body('username').notEmpty().withMessage('Имя пользователя должно быть указано'),
    body('database').notEmpty().withMessage('База данных должна быть указана'),
    body('password').notEmpty().withMessage('Пароль должен быть указан'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateAuth, validateAdminAuth };
