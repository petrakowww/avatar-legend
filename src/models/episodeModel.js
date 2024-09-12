const { getDatabaseConnection } = require('./dbconnects/databaseCreation');

const modelGetNextEpisode = async (seasonId, episodeId) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = `
            SELECT * FROM episodes
            WHERE season_id = ? AND id > ?
            ORDER BY id ASC
            LIMIT 1
        `;
        const [result] = await db.promise().query(query, [seasonId, episodeId]);
        return result[0];
    } catch (error) {
        throw new Error('Ошибка получения следующего эпизода: ' + error.message);
    }
};

const modelGetPreviousEpisode = async (seasonId, episodeId) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = `
            SELECT * FROM episodes
            WHERE season_id = ? AND id < ?
            ORDER BY id DESC
            LIMIT 1
        `;
        const [result] = await db.promise().query(query, [seasonId, episodeId]);
        return result[0];
    } catch (error) {
        throw new Error('Ошибка получения предыдущего эпизода: ' + error.message);
    }
};

const modelGetEpisodeById = async (seasonId, episodeId) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = `
            SELECT 
                e.id AS episode_id,
                e.title AS episode_title,
                e.duration AS episode_duration,
                e.description AS episode_description,
                e.video_url AS episode_video_url,
                e.release_date AS episode_release,
                s.id AS season_id,
                s.title AS season_title
            FROM 
                episodes e
            JOIN 
                seasons s ON e.season_id = s.id
            WHERE 
                e.season_id = ? AND e.id = ?
        `;
        const [result] = await db.promise().query(query, [seasonId, episodeId]);
        return result[0];
    } catch (error) {
        throw new Error('Ошибка получения эпизода по ID: ' + error.message);
    }
};

const modelCreateEpisode = async (episode) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = `
            INSERT INTO episodes (season_id, title, duration, release_date, video_url, description) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [episode.seasonId, episode.title, episode.duration, episode.release_date, episode.videoUrl,
            episode.description];
        const [result] = await db.promise().query(query, values);
        return result.insertId;
    } catch (error) {
        throw new Error('Ошибка создания эпизода: ' + error.message);
    }
};

const modelUpdateEpisode = async (episode) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = `
            UPDATE episodes 
            SET title = ?, duration = ?, release_date = ?, video_url = ?, description = ? 
            WHERE id = ?
        `;
        const values = [episode.title, episode.duration, episode.release_date, episode.videoUrl, episode.description, episode.id];
        await db.promise().query(query, values);
    } catch (error) {
        throw new Error('Ошибка обновления эпизода: ' + error.message);
    }
};

const modelGetEpisodeByIdInfo = async (id) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = 'SELECT * FROM episodes WHERE id = ?';
        const [rows] = await db.promise().query(query, [id]);
        return rows[0];
    } catch (error) {
        throw new Error('Ошибка получение информации о эпизоде: ' + error.message);
    }
};

const modelGetAllEpisodesBySeason = async (id) => {
    try{
        const { db } = await getDatabaseConnection();
        const query = 'SELECT * FROM episodes WHERE season_id = ?';
        const [episodes] = await db.promise().query(query, [id]);
        return episodes;
    }catch (error) {
        throw new Error('Ошибка получения всех эпизодов: ' + error.message);
    }
};

const modelDeleteEpisode = async (episodeId) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = 'DELETE FROM episodes WHERE id = ?';
        const [result] = await db.promise().query(query, [episodeId]);
        return result.affectedRows;
    } catch (error) {
        throw new Error('Ошибка удаления эпизода: ' + error.message);
    }
};

const modelUpdateEpisodeCount = async (seasonId) => {
    try {
        const { db } = await getDatabaseConnection();
        const query = `
            UPDATE seasons 
            SET episode_count = (SELECT COUNT(*) FROM episodes WHERE season_id = ?) 
            WHERE id = ?
        `;
        await db.promise().query(query, [seasonId, seasonId]);
        const [updatedSeason] = await db.promise().query('SELECT * FROM seasons WHERE id = ?', [seasonId]);
        return updatedSeason[0];
    } catch (error) {
        throw new Error('Ошибка обновления эпизодов: ' + error.message);
    }
};

module.exports = {
    modelGetNextEpisode,
    modelGetPreviousEpisode,
    modelGetEpisodeById,
    modelGetEpisodeByIdInfo,
    modelUpdateEpisode,
    modelUpdateEpisodeCount,
    modelDeleteEpisode,
    modelCreateEpisode,
    modelGetAllEpisodesBySeason
};
