const { modelSubmitRatingToDatabase } = require('../models/ratingModel');

const controllerSubmitRating = async (req, res) => {
    try {
        const { seriesId, userId, rating } = req.body;
        const newAverageRating = await modelSubmitRatingToDatabase(seriesId, userId, rating);
        res.status(200).json({ message: 'Рейтинг успешно выставлен', averageRating: newAverageRating });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера при отправки рейтинга', error: error.message });
    }
};

module.exports = { controllerSubmitRating };
