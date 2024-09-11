function clearWatchSeason(req, res, next) {
    if (!req.url.startsWith('/current_season')) {
        delete req.session.watch_season;
    }
    next();
}

module.exports = clearWatchSeason;
