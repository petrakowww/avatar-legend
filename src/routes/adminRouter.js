const express = require('express');
const router = express.Router();
const { allowedRoles } = require("../middlewares/validateSession");
const multer = require('multer');

const { modelGetSeriesWithSeasonsAndEpisodes} = require('../models/seriesModel');
const { modelGetUsersWithCommentsAndFeedback } = require('../models/userModel');

const { controllerUpdateSerial } = require('../controllers/seriesController');

const { controllerDeleteUser, controllerDeleteComment, controllerDeleteFeedback } = require('../controllers/userController');

const { controllerAddEpisode,
    controllerUpdateEpisode,
    controllerDeleteEpisode } = require('../controllers/episodeController');

const { controllerDeleteSeason,
    controllerAddSeason,
    controllerUpdateSeason} = require('../controllers/seasonController');


const { toLocaleDateString  } = require('../utils/dateFormattedSQL');

const { Buffer } = require('buffer');

const storageSeasonPreviews = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img/seasons/previews/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const buffer = Buffer.from(file.originalname, 'latin1');
        const encodedName = buffer.toString('utf8');
        cb(null, uniqueSuffix + '-' + encodedName);
    }
});

const uploadSeasonPreviews = multer({
    storage: storageSeasonPreviews,
    limits: { fileSize: 50 * 1024 * 1024 } // 50 MB limit
});

const storageEpisodeVideos = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/video/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const buffer = Buffer.from(file.originalname, 'latin1');
        const encodedName = buffer.toString('utf8');
        cb(null, uniqueSuffix + '-' + encodedName);
    }
});

const uploadEpisodeVideos = multer({
    storage: storageEpisodeVideos,
    limits: { fileSize: 1000 * 1024 * 1024 }
});

const upload = multer({
    dest: '/img/index/BG/',
    limits: { fileSize: 50 * 1024 * 1024 }
});


router.get('/', allowedRoles(['admin']), async (req, res) => {
    try {
        const series = await modelGetSeriesWithSeasonsAndEpisodes();
        const usersWithComments = await modelGetUsersWithCommentsAndFeedback();
        console.log(usersWithComments);
        res.render('controlPanelView', {
            session: req.session,
            series: series[0],
            seasons: series[0].seasons,
            users: usersWithComments,
            toLocaleDateString
        });
    } catch (err) {
        console.error('Ошибка при переходе на панель администратора:', err);
        res.status(500).send('Внутренняя ошибка сервера');
    }
});

router.post('/saveSeries', allowedRoles(['admin']), upload.single('previewImage'), controllerUpdateSerial);

// CRUD Добавление сезонов (без учета выборки)

router.post('/addSeason', allowedRoles(['admin']), uploadSeasonPreviews.single('image'), controllerAddSeason);

router.delete('/deleteSeason/:seasonId', allowedRoles(['admin']), controllerDeleteSeason);

router.put('/updateSeason/:seasonId', allowedRoles(['admin']), uploadSeasonPreviews.single('image'), controllerUpdateSeason);

// CRUD Добавление эпизодов (без учета выборки)

router.post('/addEpisode', allowedRoles(['admin']), uploadEpisodeVideos.single('file'), controllerAddEpisode);

router.delete('/deleteEpisode/:id', allowedRoles(['admin']), controllerDeleteEpisode);

router.put('/updateEpisode/:id', allowedRoles(['admin']), uploadEpisodeVideos.single('file'), controllerUpdateEpisode);

// D Для пользователей, комментариев и обратной связи (без учета выборки)

router.delete('/deleteUser/:id', allowedRoles(['admin']), controllerDeleteUser);

router.delete('/deleteComment/:id', allowedRoles(['admin']), controllerDeleteComment);

router.delete('/deleteFeedback/:id', allowedRoles(['admin']), controllerDeleteFeedback);

module.exports = router;