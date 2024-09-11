const { modelCreateUser, modelGetUserByCredentials, modelGetAdminByCredentials } = require('../models/userModel');
const { changeConfiguration } = require('../models/dbconnects/databaseCreation');

const controllerRegisterUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await modelCreateUser(username, email, password);
        res.status(200).json({ message: 'Пользователь успешно добавлен!' });
    } catch (err) {
        res.status(500).json({ message: 'Внутренняя ошибка сервера - возможно проблемы с БД' });
    }
};

const controllerAuthenticationUser = async (req, res) => {
    const { credential, password } = req.body;
    try {
        const user = await modelGetUserByCredentials(credential, password);
        if (!user) {
            return res.status(400).json({ message: 'Некорректные данные' });
        }
        await changeConfiguration('user');
        console.log(user);
        req.session.regenerate((err) => {
            if (err) {
                return res.status(400).json({ message: 'Ошибка в регенерации сессии' });
            }
            req.session.user = { id: user.id, username: user.username, userType: 'user', email: user.email };

            res.status(200).json({ message: 'Успешная аунтификация' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка на стороне сервера: ' + err });
    }
};

const controllerAuthenticationAdmin = async (req, res) => {
    const { host, username, database, password } = req.body;
    try {
        const admin = await modelGetAdminByCredentials(username, password, host, database);
        if (!admin) {
            return res.status(400).json({ message: 'Некорректные данные' });
        }
        await changeConfiguration('admin');
        req.session.regenerate((err) => {
            if (err) {
                return res.status(400).json({ message: 'Ошибка в регенерации сессии' });
            }
            req.session.user = { id: admin.id, username: admin.user, userType: 'admin' };
            res.status(200).json({ message: 'Успешная аунтификация администратора' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка на стороне сервера: ' + err });
    }
};

const controllerLogoutUser = async (req, res) => {
    if (req.session.user && req.session.user.userType === 'observer') {
        return res.status(400).json({ message: 'Невозможно выйти, так как вы уже наблюдатель' });
    }
    req.session.destroy(async (err) => {
        if (err) {
            return res.status(400).json({ message: 'Ошибка выхода из системы' });
        }
        await changeConfiguration('observer');
        res.redirect('/');
    });
};

module.exports = {
    controllerRegisterUser,
    controllerAuthenticationUser,
    controllerAuthenticationAdmin,
    controllerLogoutUser
};