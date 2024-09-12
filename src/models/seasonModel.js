const { getDatabaseConnection } = require('./dbconnects/databaseCreation');

const modelSelectSeasonsWithEpisodes = async (seasonId) => {
    try {
        const { db } = await getDatabaseConnection();

        const seasonQuery = `
            SELECT 
                s.id AS season_id,
                s.title AS season_title,
                s.description AS season_description,
                s.episode_count AS season_episode_count,
                s.release_date AS season_release,
                s.preview_image AS season_preview_image,
                s.unique_number AS season_unique_number,
                e.id AS episode_id,
                e.title AS episode_title,
                e.video_url AS episode_video_url
            FROM 
                seasons s
            LEFT JOIN 
                episodes e ON s.id = e.season_id
            WHERE 
                s.id = ?
            ORDER BY 
                s.unique_number ASC, e.id ASC;
        `;

        const [seasonData] = await db.promise().query(seasonQuery, [seasonId]);

        if (seasonData.length === 0) {
            throw new Error('Сезон не найден');
        }

        const season = {
            season_id: seasonData[0].season_id,
            season_title: seasonData[0].season_title,
            season_description: seasonData[0].season_description,
            season_episode_count: seasonData[0].season_episode_count,
            season_release: seasonData[0].season_release,
            season_preview_image: seasonData[0].season_preview_image,
            season_unique_number: seasonData[0].season_unique_number,
            episodes: []
        };

        seasonData.forEach(row => {
            if (row.episode_id) {
                season.episodes.push({
                    episode_id: row.episode_id,
                    episode_title: row.episode_title,
                    episode_video_url: row.episode_video_url
                });
            }
        });

        return season;
    } catch (err) {
        throw new Error('Ошибка получения эпизодов с сезонами: ' + err.message);
    }
};



const modelUpdateSeasonViewCount = async (seasonId) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = `
            UPDATE seasons
            SET view_count = view_count + 1
            WHERE id = ?
        `;
        await db.promise().query(query, [seasonId]);
    } catch (err) {
        throw new Error('Ошибка обновления просмотров сезона: ' + err.message);
    }
};


const modelAddSeason = async (season) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = 'INSERT INTO seasons (series_id, title, description, episode_count, ' +
            'release_date, preview_image, unique_number) VALUES (?, ?, ?, ?, ?, ?, ?)';

        const values = [
            season.seriesId,
            season.title,
            season.description,
            0,
            season.releaseDate,
            season.imagePath,
            season.uniqueNumber
        ];

        const [result] = await db.promise().query(query, values);

        return result.insertId;
    } catch (error) {
        throw new Error('Ошибка добавления сезона: ' + error.message);
    }
};


const modelGetSeasonById = async (seasonId) => {
    try {
        const { db } = await getDatabaseConnection();
        const [rows] = await db.promise().query('SELECT * FROM seasons WHERE id = ?', [seasonId]);
        return rows[0];
    } catch (error) {
        throw new Error('Ошибка получения сезона по D: ' + error.message);
    }
};

const modelDeleteSeasonById = async (seasonId) => {
    try {
        const { db } = await getDatabaseConnection();
        await db.promise().query('DELETE FROM seasons WHERE id = ?', [seasonId]);
    } catch (error) {
        throw new Error('Ошибка удаления сезона: ' + error.message);
    }
};

const modelUpdateSeasonDetails = async (seasonId, updatedSeason) => {
    try {
        const { title, description, episode_count, release_date, preview_image, uniqueNumber } = updatedSeason;
        const { db } = await getDatabaseConnection();

        const sql = `
            UPDATE seasons 
            SET title = ?, description = ?, episode_count = ?, release_date = ?, preview_image = ?, unique_number = ?
            WHERE id = ?
        `;

        await db.promise().query(sql, [title, description, episode_count, release_date, preview_image, uniqueNumber, seasonId]);
    } catch (error) {
        throw new Error('Ошибка обновления сезона: ' + error.message);
    }
};

const modelGetSeasonByUniqueNumber = async (uniqueNumber) => {
    try {
        const { db } = await getDatabaseConnection();
        const sql = `SELECT * FROM seasons WHERE unique_number = ?`;
        const [rows] = await db.promise().query(sql, [uniqueNumber]);
        return rows[0];
    } catch (error) {
        throw new Error('Ошибка получение сезона по уникальному номеру: ' + error.message);
    }
};



module.exports = { modelSelectSeasonsWithEpisodes,
    modelUpdateSeasonViewCount,
    modelAddSeason,
    modelGetSeasonById,
    modelDeleteSeasonById,
    modelUpdateSeasonDetails,
    modelGetSeasonByUniqueNumber};
