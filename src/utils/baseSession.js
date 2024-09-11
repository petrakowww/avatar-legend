module.exports = (app) => {
    app.use((req, res, next) => {
        if (!req.session.user) {
            req.session.user = { id: 'observer', username: 'observer', userType: 'observer' };
        }
        next();
    });
};