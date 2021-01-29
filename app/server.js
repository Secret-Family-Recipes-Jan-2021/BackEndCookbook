// package imports
const express = require('express');
require("dotenv").config();

// route imports

const app = express();

// middleware
app.use(express.json());

// app routes

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
