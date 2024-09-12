const mysql = require('mysql2');

let dbConnection = null;
let currentConfig = null;

const connectToDatabase = (userType) => {
    if (dbConnection && currentConfig && currentConfig.userType === userType) {
        console.log('Соединение уже используется для такого типа пользователя:', userType);
        return Promise.resolve({ db: dbConnection });
    }

    let dbConfig;

    switch (userType) {
        case 'user':
            dbConfig = {
                host: 'localhost',
                user: 'avatar_user',
                password: 'avatar',
                database: 'avatar'
            };
            break;
        case 'admin':
            dbConfig = {
                host: 'localhost',
                user: 'root',
                password: 'admin',
                database: 'avatar'
            };
            break;
        case 'observer':
            dbConfig = {
                host: 'localhost',
                user: 'obs_avatar',
                password: '',
                database: 'avatar'
            };
            break;
        default:
            return Promise.reject(new Error('Такого типа настройки не существует'));
    }

    const db = mysql.createConnection(dbConfig);

    return new Promise((resolve, reject) => {
        db.connect((err) => {
            if (err) {
                reject(err);
            } else {
                console.log(`Вы подключились к базе данных как ${userType}`);
                dbConnection = db;
                currentConfig = { userType, dbConfig };
                resolve({ db: dbConnection });
            }
        });
    });
};

const changeConfiguration = (userType) => {
    if (currentConfig && currentConfig.userType === userType) {
        return Promise.resolve({ db: dbConnection });
    }
    return connectToDatabase(userType);
};

const getDatabaseConnection = () => {
    if (!dbConnection) {
        return Promise.reject(new Error('Соединение не существует!'));
    }
    return Promise.resolve({ db: dbConnection });
};

module.exports = { connectToDatabase, getDatabaseConnection, changeConfiguration };
