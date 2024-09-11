const { getDatabaseConnection } = require('./dbconnects/databaseCreation');
const bcrypt = require('bcryptjs');

const modelCreateUser = async (username, email, password) => {
    try {
        const { db } = await getDatabaseConnection();
        const passwordHash = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, email, password_hash, created_at) VALUES (?, ?, ?, NOW())';
        const [results] = await db.promise().execute(query, [username, email, passwordHash]);
        return results;
    } catch (err) {
        throw new Error('Ошибка при создании пользователя: ' + err.message);
    }
};

const modelGetUserByCredentials = async (credential, password) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = 'SELECT * FROM users WHERE (username = ? OR email = ?)';
        const [results] = await db.promise().execute(query, [credential, credential]);
        if (results.length === 0) {
            return null;
        }
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        return isMatch ? user : null;
    } catch (err) {
        throw new Error('Ошибка при получении пользователя по учетным данным: ' + err.message);
    }
};

const modelGetAdminByCredentials = async (username, password, host, database) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = 'SELECT * FROM admins WHERE user = ? AND host = ? AND db = ?';
        const [results] = await db.promise().execute(query, [username, host, database]);
        if (results.length === 0) {
            return null;
        }
        const admin = results[0];
        const isMatch = await bcrypt.compare(password, admin.password);
        return isMatch ? admin : null;
    } catch (err) {
        throw new Error('Ошибка при получении учетных данных администратора: ' + err.message);
    }
};

const modelGetUsersWithCommentsAndFeedback = async () => {
    try {
        const { db } = await getDatabaseConnection();

        const usersQuery = `
            SELECT 
                u.id, 
                u.username, 
                u.email, 
                u.created_at 
            FROM 
                users u
        `;

        const usersData = await db.promise().query(usersQuery);

        const commentsQuery = `
            SELECT
                r.id,
                r.user_id,
                r.episode_id,
                r.review_text,
                r.review_date
            FROM
                reviews r
        `;

        const commentsData = await db.promise().query(commentsQuery);

        const callbackQuery = `
            SELECT
                c.id,
                c.user_id,
                c.number,
                c.feedback_text,
                c.feedback_date
            FROM
                contacts c       
        `;

        const feedbackData = await db.promise().query(callbackQuery);

        return usersData[0].map(user => {
            const reviews = commentsData[0].filter(review => review.user_id === user.id);
            const callbacks = feedbackData[0].filter(feedback => feedback.user_id === user.id);
            return {...user, reviews, callbacks};
        });
    } catch (err) {
    }
};

const modelDeleteUserById = async (userId) => {
    try {
        const { db } = await getDatabaseConnection();
        await db.promise().query('DELETE FROM users WHERE id = ?', [userId]);
    } catch (err) {
        throw new Error('Ошибка при удалении пользователя: ' + err.message);
    }
};

const modelDeleteCommentById = async (commentId) => {
    try {
        const { db } = await getDatabaseConnection();
        await db.promise().query('DELETE FROM reviews WHERE id = ?', [commentId]);
    } catch (err) {
        throw new Error('Ошибка при удалении комментария: ' + err.message);
    }
};

const modelDeleteFeedbackById = async (feedbackId) => {
    try {
        const { db } = await getDatabaseConnection();
        await db.promise().query('DELETE FROM contacts WHERE id = ?', [feedbackId]);
    } catch (err) {
        throw new Error('Ошибка при удалении отзыва: ' + err.message);
    }
};

module.exports = {
    modelCreateUser,
    modelGetUserByCredentials,
    modelGetAdminByCredentials,
    modelGetUsersWithCommentsAndFeedback,
    modelDeleteUserById,
    modelDeleteCommentById,
    modelDeleteFeedbackById
};
