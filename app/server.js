const express = require('express');

const app = express();

app.get('/', (request, response, next) => {
    return response.status(200).json("Hello World");
});

module.exports = app;