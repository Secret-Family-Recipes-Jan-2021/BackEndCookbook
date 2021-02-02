// package imports
const express = require('express');
require("dotenv").config();
const cookieParser = require("cookie-parser");

// middleware imports
const requestLogger = require('./middleware/requestLogger');
const restricted = require('./middleware/restricted');

// route imports
const categories = require('./routes/categories/router');
const recipes = require('./routes/recipes/router');
const guests = require('./routes/guests/router');

const app = express();

// middleware
app.use(requestLogger());
app.use(express.json());
app.use(cookieParser());

// app routes
app.use('/api/categories', restricted, categories);
app.use('/api/recipes', restricted, recipes);
// app.use('/api/categories', categories);
// app.use('/api/recipes', recipes);
app.use('/api/guests', guests);

// hello world route to verify the server runs
app.get('/', (request, response, next) => {
    return response.status(200).json("Hello World");
});

// generic error handler
app.use((error, request, response, next) => {
    console.log(error);
    return response.status(500).json({'message': 'an error occurred'});
});

module.exports = app;
