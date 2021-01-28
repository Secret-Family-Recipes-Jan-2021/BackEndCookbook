const express = require('express');

const app = express();

app.get('/', (request, response, next) => {
    return response.status(200).json("Hello World");
});

// generic error handler
app.use((error, request, response) => {
    console.log(error);
    return response.status(500).json({'message': 'an error occurred'});
});

module.exports = app;