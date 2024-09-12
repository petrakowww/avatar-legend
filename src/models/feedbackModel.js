const { getDatabaseConnection } = require('./dbconnects/databaseCreation');

const modelAddFeedback = async (userId, username, email, number, feedbackText) => {
    try{
        const { db } = await getDatabaseConnection();
        const query = `
        INSERT INTO contacts (user_id, username, email, number, feedback_text, feedback_date)
        VALUES (?, ?, ?, ?, ?, NOW())
    `;
        await db.promise().query(query, [userId, username, email, number, feedbackText]);
    }
    catch (error){
        throw new Error('Не удалось добавить обращение: ' + error.message);
    }
};

const modelGetAllFeedback = async () => {
    try {
        const { db } = await getDatabaseConnection();
        const query = `
            SELECT * FROM contacts
        `;
        const [feedbackList] = await db.promise().query(query);
        return feedbackList;
    } catch (error) {
        throw new Error('Не удалось получить список обращений: ' + error.message);
    }
};

module.exports = { modelAddFeedback, modelGetAllFeedback }
