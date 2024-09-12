const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mainRouter = require('./routes/mainRouter');
const authRouter = require('./routes/authenticationRouter');
const ratingRouter = require('./routes/ratingRouter');
const seasonRouter = require('./routes/seasonRouter');
const episodeRouter = require('./routes/episodeRouter');
const contactRouter = require('./routes/contactsRouter');
const controlRouter = require('./routes/adminRouter');
const setSession = require('./utils/baseSession');
const { connectToDatabase } = require('./models/dbconnects/databaseCreation');
const clearWatchSeason = require('./utils/clearWatchSeasonUtils');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(session({
    secret: 'MY_PROJECT_SECRET_KEY_PETRAKOV_EGOR',
    resave: false,
    saveUninitialized: false
}));

setSession(app);
connectToDatabase('observer')
    .then(({ db }) => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Сервер работает на порту ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Ошибка подключения:', err);
        process.exit(1);
    });


app.use(clearWatchSeason);

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/current_season', seasonRouter);
app.use('/seasons', seasonRouter);
app.use('/info-seasons', seasonRouter);
app.use('/rating', ratingRouter);
app.use('/episodes', episodeRouter);
app.use('/contacts', contactRouter);
app.use('/admin', controlRouter);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'html', '404.html'));
});