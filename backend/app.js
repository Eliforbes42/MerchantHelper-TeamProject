const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

/*ADD ROUTES FROM THE ROUTES FOLDER*/
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const islandsRouter = require('./routes/islands');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle cross browser problems
app.all('/*', (req, res, next) => {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,X-Requested-With,Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Expose-Headers', 'total-rows');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*ADD ROUTES TO APP*/
app.use('/api/index', indexRouter);
app.use('/api/users/', usersRouter);
app.use('/api/islands/', islandsRouter);

app.listen(port, '0.0.0.0', () => {
    console.log("UP AND RUNNING!");
});

