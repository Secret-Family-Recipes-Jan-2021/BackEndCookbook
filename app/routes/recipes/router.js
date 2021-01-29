const express = require('express');

const Recipe = require('./model');

const { validateRecipe } = require('./middleware');

const recipes = express.Router();

recipes.get('/', async (request, response, next) => {
    try {
        let recipes = Recipe.getRecipes();

        return response.status(200).json({'message': 'hello world'});
    } catch (error) {
        next(error);
    }
});

recipes.post('/', validateRecipe(), async (request, response, next) => {
    try {
        let recipe = await Recipe.addRecipe(request.recipeData);

    } catch (error) {
        next(error);
    }
});

recipes.put('/:id', validateRecipe(), async (request, response, next) => {
    try {
        let user_id = request.token.user_id;

        return response.status(200).json({'message': 'hello world'});
    } catch (error) {
        next(error);
    }
})

recipes.delete('/:id', validateRecipe(), async (request, response, next) => {
    try {
        let user_id = request.token.user_id;

        return response.status(200).json({'message': 'hello world'});
    } catch (error) {
        next(error);
    }
});

module.exports = recipes;
