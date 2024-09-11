const { getDatabaseConnection } = require('./dbconnects/databaseCreation');

const modelAddComment = async (episodeId, userId, reviewText) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = 'INSERT INTO reviews (episode_id, user_id, review_text, review_date) VALUES (?, ?, ?, NOW())';
        const [result] = await db.promise().query(query, [episodeId, userId, reviewText]);

        const getCommentQuery = 'SELECT id, review_text, review_date FROM reviews WHERE id = ?';
        const [comment] = await db.promise().query(getCommentQuery, [result.insertId]);
        const { id, review_text, review_date } = comment[0];

        return { review_text, review_date, id };
    } catch (error) {
        throw new Error('Не удалось добавить комментарий: ' + error.message);
    }
};


const modelGetCommentsByCurrentUser = async (episodeId, userId) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = `
            SELECT reviews.*, users.username
            FROM reviews
            JOIN users ON reviews.user_id = users.id
            WHERE reviews.episode_id = ? AND reviews.user_id = ?
        `;
        const [comments] = await db.promise().query(query, [episodeId, userId]);
        return comments;
    } catch (error) {
        throw new Error('Не удалось получить комментарии: ' + error.message);
    }
};

const modelGetAllCommentsExceptCurrentUser = async (episodeId, userId) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = `
            SELECT reviews.*, users.username
            FROM reviews
            JOIN users ON reviews.user_id = users.id
            WHERE reviews.episode_id = ? AND reviews.user_id != ?
        `;
        const [comments] = await db.promise().query(query, [episodeId, userId]);
        return comments;
    } catch (error) {
        throw new Error('Не удалось получить комментарии: ' + error.message);
    }
};


const modelGetAllComments = async (episodeId) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = `
            SELECT reviews.*, users.username
            FROM reviews
            JOIN users ON reviews.user_id = users.id
            WHERE reviews.episode_id = ?
        `;
        const [comments] = await db.promise().query(query, [episodeId]);
        return comments;
    } catch (error) {
        throw new Error('Не удалось получить комментарии: ' + error.message);
    }
};

const modelDelComment = async (commentId) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = 'DELETE FROM reviews WHERE id = ?';
        await db.promise().query(query, [commentId]);
    } catch (error) {
        throw new Error('Не удалось удалить комментарий: ' + error.message);
    }
};


module.exports = { modelAddComment,
    modelGetCommentsByCurrentUser,
    modelGetAllCommentsExceptCurrentUser,
    modelGetAllComments,
    modelDelComment };
