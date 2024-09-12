const validateRating = (req, res, next) => {
    if (!req.session.user) {
        return res.status(400).json({ error: 'Пользователь не авторизован' });
    }

    if (req.method !== 'POST') {
        return res.status(400).json({ error: 'Метод запроса не поддерживается' });
    }

    const { rating } = req.body;
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Рейтинг должен быть от 1 до 5' });
    }
    next();
};


module.exports = validateRating;
