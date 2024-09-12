const express = require('express');
const router = express.Router();
const { modelGetSeriesWithSeasons } = require('../models/seriesModel');
const { modelGetUserRatingForSeries } = require('../models/ratingModel');
const { allowedRoles } = require('../middlewares/validateSession');
const { toLocaleDateString  } = require('../utils/dateFormattedSQL');

router.get('/', allowedRoles(['user', 'admin']), async (req, res) => {
    try {
        const userId = req.session.user.id;
        const seriesData = await modelGetSeriesWithSeasons();
        const seriesId = seriesData[0].id;
        const userRating = await modelGetUserRatingForSeries(seriesId, userId);
        res.render('indexView', { session: req.session, series: seriesData, userRating: userRating, toLocaleDateString });
    } catch (error) {
        console.error('Ошибка получении информации о сериале:', error);
        res.status(500).send('Внутренняя ошибка сервера');
    }
});


module.exports = router;
