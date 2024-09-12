const express = require('express');
const router = express.Router();
const { allowedRoles } = require('../middlewares/validateSession');

const { modelGetNextEpisode, modelGetPreviousEpisode, modelGetEpisodeById } = require('../models/episodeModel');

const { toLocaleDateString  } = require('../utils/dateFormattedSQL');

const { controllerAddComment,
    controllerDeleteComment,
    controllerGetCommentsByUserType } = require('../controllers/commentController');

router.get(['/:seasonId&:episodeId', '/ajax/:seasonId&:episodeId'], allowedRoles(['user', 'admin']), async (req, res) => {
    const { seasonId, episodeId } = req.params;
    const isAjax = req.path.includes('/ajax');

    try {
        const episodeData = await modelGetEpisodeById(seasonId, episodeId);
        const nextEpisode = await modelGetNextEpisode(seasonId, episodeId);
        const previousEpisode = await modelGetPreviousEpisode(seasonId, episodeId);

        if (episodeData) {
            const { commentsUser, commentsOthers, comments } = await controllerGetCommentsByUserType(episodeId, req.session.user.userType, req.session.user.id);

            console.log({ episode: episodeData, season: seasonId, session: req.session, nextEpisode, previousEpisode, commentsUser, commentsOthers, comments });

            if (isAjax) {
                res.json({
                    episode: episodeData,
                    season: seasonId, session: req.session,
                    nextEpisode,
                    previousEpisode,
                    commentsUser,
                    commentsOthers,
                    comments, toLocaleDateString });
            } else {
                res.render('episodeView', {
                    episode: episodeData,
                    season: seasonId,
                    session: req.session,
                    nextEpisode,
                    previousEpisode,
                    commentsUser,
                    commentsOthers,
                    comments, toLocaleDateString });
            }
        } else {
            res.status(404).send('Эпизод не найден');
        }
    } catch (error) {
        console.error(error);
        if (isAjax) {
            res.status(500).json({ error: 'Ошибка сервера' });
        } else {
            res.status(500).send('Ошибка сервера');
        }
    }
});


router.post('/comments', allowedRoles(['user']), controllerAddComment);

router.post('/del', allowedRoles(['user']), controllerDeleteComment);

module.exports = router;
