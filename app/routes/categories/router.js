const express = require('express');

const Category = require('./model');

const { validateCategory, validateCategoryID } = require('./middleware');

const categories = express.Router();

categories.get('/', async (request, response, next) => {
    try {
        let categories = await Category.getAll();

        return response.status(200).json({data: categories});
    } catch (error) {
        next(error);
    }
});

categories.post('/', validateCategory(), async (request, response, next) => {
    try {
        return response.status(201).json({message: 'hello world'});
    } catch (error) {
        next(error);
    }
});

categories.put('/:id', validateCategory(), validateCategoryID(), async (request, response, next) => {
    try {
        return response.status(200).json({message: 'hello world'});
    } catch (error) {
        next(error);
    }
});

categories.delete('/id', validateCategoryID(), async (request, response, next) => {
    try {
        return response.status(200).json({message: 'hello world'});
    } catch (error) {
        next(error);
    }
});

module.exports = categories;
