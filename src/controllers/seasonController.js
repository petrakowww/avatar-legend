const path = require("path");
const fs = require("fs");

const { modelUpdateSeasonDetails,
    modelAddSeason,
    modelGetSeasonById,
    modelDeleteSeasonById,
    modelUpdateSeasonViewCount,
    modelGetSeasonByUniqueNumber} = require('../models/seasonModel');

const { modelGetAllEpisodesBySeason } = require('../models/episodeModel');

const controllerUpdateSeasonView = async (req, res, seasonId) => {
    if (!req.session.watch_season || req.session.watch_season !== seasonId) {
        req.session.watch_season = seasonId;
        try {
            await modelUpdateSeasonViewCount(seasonId);
        } catch (error) {
            console.error('Ошибка при обновлении просмотров:', error);
            res.status(400).send('Ошибка сервера');
        }
    }
};

const controllerAddSeason = async (req, res) => {
    try {
        const { title, description, releaseDate, seriesId, uniqueNumber } = req.body;
        let imagePath = '/img/seasons/default/default.jpg';

        if (req.file) {
            const filename = req.file.filename;
            imagePath = `/img/seasons/previews/${filename}`;
        }

        const formattedReleaseDate = releaseDate ? releaseDate : null;

        const newSeason = {
            seriesId,
            title,
            description,
            releaseDate: formattedReleaseDate,
            imagePath,
            uniqueNumber
        };

        newSeason.id = await modelAddSeason(newSeason);
        res.status(200).json({ message: 'Новый сезон успешно добавлен', newSeason });
    } catch (error) {
        console.error('Ошибка при добавлении сезона:', error);
        res.status(500).send('Внутренняя ошибка сервера');
    }
};

const controllerDeleteSeason = async (req, res) => {
    try {
        const seasonId = req.params.seasonId;
        const season = await modelGetSeasonById(seasonId);

        if (season) {
            const episodes = await modelGetAllEpisodesBySeason(seasonId);

            for (const episode of episodes) {
                const videoPath = path.join(__dirname, '..', 'public', episode.video_url);
                fs.unlink(videoPath, (err) => {
                    if (err) {
                        console.error(`Ошибка при удалении видеофайла: ${videoPath}`, err);
                    } else {
                        console.log(`Видео файл успешно удалён: ${videoPath}`);
                    }
                });
            }
            const imagePath = path.join(__dirname, '..', 'public', 'img', 'seasons', 'previews', path.basename(season.preview_image));

            if (!imagePath.includes('default')) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Ошибка при удалении файла изображения:', err);
                    } else {
                        console.log('Файл изображения успешно удалён');
                    }
                });
            }

            await modelDeleteSeasonById(seasonId);
            res.status(200).json({ message: 'Сезон успешно удалён' });
        } else {
            res.status(404).json({ message: 'Сезон не найден' });
        }
    } catch (error) {
        console.error('Ошибка при удалении сезона:', error);
        res.status(500).send('Внутренняя ошибка сервера');
    }
};

const controllerUpdateSeason = async (req, res) => {
    try {
        const seasonId = req.params.seasonId;
        const { title, description, episode_count, release_date, uniqueNumber } = req.body;
        const season = await modelGetSeasonById(seasonId);

        if (!season) {
            return res.status(404).json({ message: 'Сезон не найден' });
        }

        const existingSeasonWithUniqueNumber = await modelGetSeasonByUniqueNumber(uniqueNumber);
        if (existingSeasonWithUniqueNumber && existingSeasonWithUniqueNumber.id !== parseInt(seasonId)) {
            return res.status(400).json({ message: 'Уникальный номер уже существует' });
        }

        let preview_image = season.preview_image;

        if (req.file) {
            preview_image = `/img/seasons/previews/${req.file.filename}`;

            if (!season.preview_image.includes('/img/seasons/default/')) {
                const oldImagePath = path.join(__dirname, '..', '..', 'public', season.preview_image);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Ошибка при удалении старого изображения:', err);
                    } else {
                        console.log('Старое изображение успешно удалено');
                    }
                });
            }
        }

        const updatedSeason = {
            title,
            description,
            episode_count,
            release_date: release_date || null,
            preview_image,
            uniqueNumber
        };

        await modelUpdateSeasonDetails(seasonId, updatedSeason);

        res.status(200).json({ message: 'Сезон успешно обновлен', season: updatedSeason });
    } catch (error) {
        console.error('Ошибка при обновлении сезона:', error);
        res.status(500).send('Внутренняя ошибка сервера');
    }
};

module.exports = { controllerUpdateSeasonView,
    controllerUpdateSeason,
    controllerAddSeason,
    controllerDeleteSeason };
