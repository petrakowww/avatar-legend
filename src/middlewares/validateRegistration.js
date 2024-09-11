const { body, validationResult } = require('express-validator');

const validateRegistration = [
    body('username').isLength({ min: 3 }).withMessage('Имя пользователя должно быть минимум 3 символа'),
    body('email').isEmail().withMessage('Некорректный адрес почты'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен быть минимум шесть символов'),
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Пароли не совпадают');
            }
            return true;
        }).withMessage('Пароли не совпадают'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateRegistration;
