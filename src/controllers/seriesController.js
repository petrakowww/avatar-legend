const path = require('path');
const fs = require('fs');
const { modelUpdateSeries, modelUpdateSeriesImage } = require('../models/seriesModel');

const controllerUpdateSerial = async (req, res) => {
    const data = req.body;

    try {
        await modelUpdateSeries(data);

        if (req.file) {
            const newFilePath = path.join(__dirname, '..', 'public', 'img', 'index', 'BG', 'BackgroundAvatar.jpg');
            fs.renameSync(req.file.path, newFilePath);

            const oldFilePath = path.join(__dirname, '..', 'public', 'img', 'index', 'BackgroundAvatar.jpg');
            if (fs.existsSync(oldFilePath) && oldFilePath !== newFilePath) {
                fs.unlinkSync(oldFilePath);
            }

            await modelUpdateSeriesImage(data.seriesId, '/img/index/BG/BackgroundAvatar.jpg');
        }

        res.status(200).send('Сериал успешно обновлен');
    } catch (err) {
        console.error('Ошибка при обновлении сериала:', err);
        res.status(500).send('Внутренняя ошибка сервера');
    }
};

module.exports = { controllerUpdateSerial };
