const { getDatabaseConnection } = require('./dbconnects/databaseCreation');

const modelGetSeriesWithSeasons = async () => {
    try {
        const { db } = await getDatabaseConnection();

        const seriesQuery = `
            SELECT 
                s.id, 
                s.title, 
                s.description, 
                s.preview_series, 
                s.rating, 
                s.release_date, 
                s.genres, 
                s.authors, 
                s.country,
                s.status
            FROM 
                series s
        `;

        const [seriesData] = await db.promise().query(seriesQuery);

        const seasonsQuery = `
            SELECT 
                se.id, 
                se.series_id, 
                se.title, 
                se.description, 
                se.episode_count, 
                se.release_date, 
                se.preview_image,
                se.view_count,
                se.unique_number
            FROM 
                seasons se
            ORDER BY 
                se.unique_number ASC
        `;

        const [seasonsData] = await db.promise().query(seasonsQuery);

        return seriesData.map(series => {
            const seasons = seasonsData.filter(season => season.series_id === series.id);
            return { ...series, seasons };
        });
    } catch (err) {
        throw new Error('Ошибка получение сериала с сезонами: ' + err.message);
    }
};

const modelGetSeriesWithSeasonsAndEpisodes = async () => {
    try {
        const { db } = await getDatabaseConnection();

        const seriesQuery = `
            SELECT 
                s.id, 
                s.title, 
                s.description, 
                s.preview_series, 
                s.rating, 
                s.release_date, 
                s.genres, 
                s.authors, 
                s.country,
                s.status
            FROM 
                series s
        `;

        const [seriesData] = await db.promise().query(seriesQuery);

        const seasonsQuery = `
            SELECT 
                se.id, 
                se.series_id, 
                se.title, 
                se.description, 
                se.episode_count, 
                se.release_date, 
                se.preview_image,
                se.view_count,
                se.unique_number
            FROM 
                seasons se
            ORDER BY 
                se.unique_number ASC
        `;

        const [seasonsData] = await db.promise().query(seasonsQuery);

        const episodesQuery = `
            SELECT
                e.id,
                e.season_id,
                e.title,
                e.duration,
                e.description,
                e.release_date,
                e.video_url
            FROM
                episodes e
        `;

        const [episodesData] = await db.promise().query(episodesQuery);

        return seriesData.map(series => {
            const seasons = seasonsData.filter(season => season.series_id === series.id).map(season => {
                const episodes = episodesData.filter(episode => episode.season_id === season.id);
                return { ...season, episodes };
            });
            return { ...series, seasons };
        });
    } catch (err) {
        throw new Error('Ошибка получение эпизодов с сериалами: ' + err.message);
    }
};

const modelUpdateSeries = async (data) => {
    const { seriesId, seriesNameTitle, seriesDescription, seriesRelease, seriesGenres, seriesAuthors, seriesCountry, seriesStatus } = data;
    try {
        const { db } = await getDatabaseConnection();

        const updateQuery = `
            UPDATE series
            SET title = ?, description = ?, release_date = ?, genres = ?, authors = ?, country = ?, status = ?
            WHERE id = ?
        `;

        const params = [seriesNameTitle, seriesDescription, seriesRelease, seriesGenres, seriesAuthors, seriesCountry, seriesStatus, seriesId];
        await db.promise().query(updateQuery, params);
    } catch (err) {
        throw new Error('Ошибка обновления сериала: ' + err.message);
    }
};

const modelUpdateSeriesImage = async (seriesId, imagePath) => {
    try {
        const { db } = await getDatabaseConnection();

        const imageUpdateQuery = `
            UPDATE series
            SET preview_series = ?
            WHERE id = ?
        `;

        await db.promise().query(imageUpdateQuery, [imagePath, seriesId]);
    } catch (err) {
        throw new Error('Ошибка обновления превью сериала: ' + err.message);
    }
};

module.exports = { modelGetSeriesWithSeasons,
    modelGetSeriesWithSeasonsAndEpisodes,
    modelUpdateSeries,
    modelUpdateSeriesImage };
