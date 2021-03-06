const path = require('path');
const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

require('./config/hbs.config'); 


app.use(express.urlencoded({extended:true}));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
})

const router = require('./config/routes.config');
app.use('/', router);

app.use(logger('dev'));

app.use((req, res, next) => {
    next(createError(404));
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render('errors/error', {
        error: error})
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.info(`App listening at port ${port}`)
})



