const { modelAddFeedback } = require('../models/feedbackModel');

const controllerSubmitFeedback = async (req, res) => {
    console.log(req.body);
    const { userId, username, email, number, feedbackText } = req.body;

    try {
        await modelAddFeedback(userId, username, email, number, feedbackText);
        res.json({ message: 'Заявка успешно отправлена' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не удалось отправить заявку' });
    }
};


module.exports = {controllerSubmitFeedback}