const {modelDeleteUserById, modelDeleteCommentById, modelDeleteFeedbackById} = require("../models/userModel");

const controllerDeleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await modelDeleteUserById(userId);
        res.status(200).json({ message: 'Пользователь успешно удален' });
    } catch (err) {
        console.error('Ошибка при удалении пользователя:', err);
        res.status(500).send('Внутренняя ошибка сервера');
    }
};

const controllerDeleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        await modelDeleteCommentById(commentId);
        res.status(200).json({ message: 'Комментарий успешно удален' });
    } catch (err) {
        console.error('Ошибка при удалении комментария:', err);
        res.status(500).send('Внутренняя ошибка сервера');
    }
};

const controllerDeleteFeedback = async (req, res) => {
    try {
        const commentId = req.params.id;
        await modelDeleteFeedbackById(commentId);
        res.status(200).json({ message: 'Комментарий успешно удален' });
    } catch (err) {
        console.error('Ошибка при удалении комментария:', err);
        res.status(500).send('Внутренняя ошибка сервера');
    }
};

module.exports = {
    controllerDeleteComment,
    controllerDeleteUser,
    controllerDeleteFeedback
};