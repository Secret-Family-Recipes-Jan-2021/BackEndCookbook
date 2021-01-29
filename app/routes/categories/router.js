const express = require('express');

const Category = require('./model');

const { validateCategory } = require('./middleware');

const categories = express.Router();

categories.get('/', async (request, response, next) => {
    try {
        let categories = await Category.getCategories();

        return response.status(200).json({'data': categories});
    } catch (error) {
        next(error);
    }
});

module.exports = categories;
