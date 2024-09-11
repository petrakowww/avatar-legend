const path = require('path');
const fs = require('fs');
const {
    modelCreateEpisode,
    modelGetEpisodeByIdInfo,
    modelUpdateEpisode,
    modelDeleteEpisode,
    modelUpdateEpisodeCount
    } = require('../models/episodeModel');

const controllerAddEpisode = async (req, res) => {
    try {
        const { title, duration, release_date, seasonId, description } = req.body;
        let videoUrl = '';

        if (req.file) {
            const filename = req.file.filename;
            videoUrl = `/video/${filename}`;
        }

        const newEpisode = {
            seasonId,
            title: title || null,
            duration: duration || null,
            release_date: release_date || null,
            description,
            videoUrl
        };

        newEpisode.id = await modelCreateEpisode(newEpisode);
        const updatedSeason = await modelUpdateEpisodeCount(seasonId);

        res.status(200).json({ message: 'Новый эпизод успешно добавлен', episode: newEpisode, updatedSeason });
    } catch (error) {
        console.error('Ошибка при добавлении эпизода:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

const controllerUpdateEpisode = async (req, res) => {
    try {
        const episodeId = req.params.id;
        const { title, duration, release_date, seasonId, description } = req.body;
        let videoUrl = '';

        const currentEpisode = await modelGetEpisodeByIdInfo(episodeId);
        if (!currentEpisode) {
            return res.status(404).json({ message: 'Эпизод не найден' });
        }

        if (req.file) {
            const filename = req.file.filename;
            videoUrl = `/video/${filename}`;

            if (currentEpisode.video_url) {
                const oldVideoPath = path.join(__dirname, '..', 'public', 'video', path.basename(currentEpisode.video_url));
                fs.unlink(oldVideoPath, (err) => {
                    if (err) {
                        console.error('Ошибка при удалении старого видеофайла:', err);
                    }
                });
            }
        } else {
            videoUrl = currentEpisode.video_url;
        }

        const updatedEpisode = {
            id: episodeId,
            seasonId,
            title: title || currentEpisode.title,
            duration: duration || currentEpisode.duration,
            release_date: release_date || currentEpisode.release_date || null,
            videoUrl,
            description
        };

        await modelUpdateEpisode(updatedEpisode);

        res.status(200).json({ message: 'Эпизод успешно обновлен', episode: updatedEpisode });
    } catch (error) {
        console.error('Ошибка при обновлении эпизода:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

const controllerDeleteEpisode = async (req, res) => {
    try {
        const episodeId = req.params.id;

        const episode = await modelGetEpisodeByIdInfo(episodeId);
        if (!episode) {
            return res.status(404).json({ message: 'Эпизод не найден' });
        }

        if (episode.video_url) {
            const videoPath = path.join(__dirname, '..', 'public', 'video', path.basename(episode.video_url));
            fs.unlink(videoPath, (err) => {
                if (err) {
                    console.error('Ошибка при удалении видеофайла:', err);
                }
            });
        }

        await modelDeleteEpisode(episodeId);
        const updatedSeason = await modelUpdateEpisodeCount(episode.season_id);

        res.status(200).json({ message: 'Эпизод успешно удален', updatedSeason });
    } catch (error) {
        console.error('Ошибка при удалении эпизода:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};


module.exports = { controllerAddEpisode, controllerUpdateEpisode, controllerDeleteEpisode }


