const { getDatabaseConnection } = require('./dbconnects/databaseCreation');

const modelSubmitRatingToDatabase = async (seriesId, userId, rating) => {
    try {
        console.log(seriesId + " " + userId + " " + rating);
        const { db } = await getDatabaseConnection();

        const checkRatingQuery = `
            SELECT *
            FROM series_rating
            WHERE series_id = ? AND user_id = ?
        `;

        const [existingRatingRows] = await db.promise().query(checkRatingQuery, [seriesId, userId]);

        if (existingRatingRows.length > 0) {
            const updateRatingQuery = `
                UPDATE series_rating
                SET rating = ?
                WHERE series_id = ? AND user_id = ?
            `;
            await db.promise().query(updateRatingQuery, [rating, seriesId, userId]);
        } else {
            const insertRatingQuery = `
                INSERT INTO series_rating (series_id, user_id, rating)
                VALUES (?, ?, ?)
            `;
            await db.promise().query(insertRatingQuery, [seriesId, userId, rating]);
        }

        const averageQuery = `
            SELECT AVG(rating) AS average_rating
            FROM series_rating
            WHERE series_id = ?
        `;
        const [averageRows] = await db.promise().query(averageQuery, [seriesId]);

        if (!averageRows || !Array.isArray(averageRows) || averageRows.length === 0) {
            throw new Error('Ошибка вычисления средней оценки');
        }

        const newAverageRating = averageRows[0].average_rating;

        const updateSeriesQuery = `
            UPDATE series
            SET rating = ?
            WHERE id = ?
        `;
        await db.promise().query(updateSeriesQuery, [newAverageRating, seriesId]);

        return newAverageRating;
    } catch (error) {
        throw new Error('Ошибка отправки рейтинга: ' + error.message);
    }
};

const modelGetUserRatingForSeries = async (seriesId, userId) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = `
            SELECT rating
            FROM series_rating
            WHERE series_id = ? AND user_id = ?
        `;
        const [rows] = await db.promise().query(query, [seriesId, userId]);
        if (rows.length > 0) {
            return rows[0].rating;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error('Не удалось получить информацию об оценках пользователя: ' + error.message);
    }
};


module.exports = { modelSubmitRatingToDatabase,
    modelGetUserRatingForSeries };
