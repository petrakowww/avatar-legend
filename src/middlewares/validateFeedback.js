const validateFeedback = (req, res, next) => {
    const { number, feedbackText } = req.body;
    const numberPattern = /^(\+7|8)?\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/;

    if (!feedbackText || feedbackText.trim() === '') {
        return res.status(400).json({ message: 'Сообщение не должно быть пустым.' });
    }

    if (!numberPattern.test(number)) {
        return res.status(400).json({ message: 'Номер телефона должен быть в формате +7(999)999-99-99, 8(999)999-99-99, 89999999999 или +79999999999.' });
    }

    next();
};

module.exports = validateFeedback;
