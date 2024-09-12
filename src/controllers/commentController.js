const { modelAddComment,
    modelGetAllCommentsExceptCurrentUser,
    modelGetCommentsByCurrentUser,
    modelGetAllComments,
    modelDelComment } = require('../models/commentModel');

const controllerAddComment = async (req, res) => {
    const { episodeId, reviewText } = req.body;
    const userId = req.session.user.id;
    const username = req.session.user.username;

    try {
        const { review_text, review_date, id } = await modelAddComment(episodeId, userId, reviewText);
        res.status(200).json({ review_text, review_date, username, id });
    } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
        res.status(500).send('Ошибка сервера: ' + error);
    }
};


const controllerGetCommentsByUserType = async (episodeId, userType, userId) => {
    try {
        if (userType === "user") {
            const commentsUser = await modelGetCommentsByCurrentUser(episodeId, userId);
            const commentsOthers = await modelGetAllCommentsExceptCurrentUser(episodeId, userId);
            return { commentsUser, commentsOthers };
        } else {
            const allComments = await modelGetAllComments(episodeId);
            return { comments: allComments };
        }
    } catch (error) {
        console.error('Ошибка при получении комментариев:', error);
        throw new Error('Ошибка сервера при получении комментариев');
    }
};

const controllerDeleteComment = async (req, res) => {
    const { commentId } = req.body;

    try {
        await modelDelComment(commentId);
        res.status(200).json({ message: 'Комментарий успешно удален' });
    } catch (error) {
        console.error('Ошибка при удалении комментария:', error);
        res.status(500).json({ error: 'Ошибка сервера при удалении комментария' });
    }
};

module.exports = { controllerAddComment, controllerGetCommentsByUserType, controllerDeleteComment };
