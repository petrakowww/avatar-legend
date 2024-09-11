const express = require('express');
const router = express.Router();
const { allowedRoles } = require('../middlewares/validateSession');
const { controllerSubmitFeedback } = require('../controllers/contactController');
const { modelGetAllFeedback } = require('../models/feedbackModel');
const validateFeedback = require('../middlewares/validateFeedback');
const { toLocaleDateString  } = require('../utils/dateFormattedSQL');

router.get('/', allowedRoles(['user', 'admin']), async (req, res) => {
    try {
        const { userType } = req.session.user;
        let feedbackList = [];
        if (userType === 'admin') {
            feedbackList = await modelGetAllFeedback();
        }
        res.render('contactsView', { session: req.session, feedbackList, toLocaleDateString });
    } catch (err) {
        console.error(err);
        res.status(500).send('Внутренняя ошибка сервера');
    }
});

router.post('/submitFeedback', allowedRoles(['user']), validateFeedback, controllerSubmitFeedback);

module.exports = router;
