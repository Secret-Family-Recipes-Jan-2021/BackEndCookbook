const express = require('express');

const recipes = express.Router();

recipes.get('/', async (request, response, next) => {
    try {
        return response.status(200).json({'message': 'hello world'});
    } catch (error) {
        next(error);
    }
});

module.exports = recipes;
