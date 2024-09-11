const express = require('express');
const router = express.Router();
const { modelSelectSeasonsWithEpisodes } = require('../models/seasonModel');
const { modelGetSeriesWithSeasons } = require('../models/seriesModel');
const { controllerUpdateSeasonView } = require("../controllers/seasonController");
const { allowedRoles } = require('../middlewares/validateSession');
const { toLocaleDateString  } = require('../utils/dateFormattedSQL');

router.get('/:id',  allowedRoles(['user', 'admin']), async (req, res) => {
    try {
        const seasonId = req.params.id;

        if (req.session.user.userType !== 'admin') {
            await controllerUpdateSeasonView(req, res, seasonId);
        }
        const seasonData = await modelSelectSeasonsWithEpisodes(seasonId);

        res.render('currentSeasonView', { season: seasonData,
            session: req.session, toLocaleDateString });
    } catch (error) {
        console.error('Ошибка получения информации о сезонах:', error);
        res.status(500).send('Внутренняя ошибка сервера');
    }
});

router.get('/',  allowedRoles(['user', 'admin']), async (req, res) => {
    try {
        const seriesData = await modelGetSeriesWithSeasons();
        res.render('seasonsView', { series: seriesData, session: req.session, toLocaleDateString });
    } catch (err) {
        console.error(err);
        res.status(500).send('Внутренняя ошибка сервера');
    }
});

module.exports = router;
