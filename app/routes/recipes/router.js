const express = require('express');

const Recipe = require('./model');

const { validateRecipe } = require('./middleware');

const recipes = express.Router();

recipes.get('/', async (request, response, next) => {
    try {
        let recipes = await Recipe.getRecipes();

        return response.status(200).json({data: recipes});
    } catch (error) {
        next(error);
    }
});

recipes.get('/:id', async (request, response, next) => {
    try {
        let recipe = await Recipe.getRecipeByID(request.params.id);

        return response.status(200).json({data: recipe})
    } catch (error) {
        next(error);
    }
});

recipes.post('/', validateRecipe(), async (request, response, next) => {
    try {
        let recipe = await Recipe.addRecipe(request.recipeData);

        return response.status(201).json({message: 'recipe successfully created', data: recipe});
    } catch (error) {
        next(error);
    }
});

recipes.put('/:id', validateRecipe(), async (request, response, next) => {
    try {
        return response.status(200).json({message: 'hello world'});
    } catch (error) {
        next(error);
    }
})

recipes.delete('/:id', validateRecipe(), async (request, response, next) => {
    try {
        return response.status(200).json({message: 'hello world'});
    } catch (error) {
        next(error);
    }
});

module.exports = recipes;
