const allowedRoles = (roles) => {

    return (req, res, next) => {
        console.log('Проверка роли пользователя:', req.session.user);
        if (!req.session.user || !roles.includes(req.session.user.userType)) {
            console.log('Перенаправление на /auth');
            return res.redirect('/auth');
        }
        next();
    };
}

module.exports = { allowedRoles };
