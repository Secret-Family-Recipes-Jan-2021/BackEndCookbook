const express = require('express');

const Recipe = require('./model');

const { validateRecipe, validateRecipeID } = require('./middleware');

const recipes = express.Router();

recipes.get('/', async (request, response, next) => {
    try {
        let recipes;

        if(request.query.title) {
            recipes = await Recipe.searchRecipes(request.query.title);
        } else if(request.query.categories) {
            let categories = request.query.categories.split(',');
            recipes = await Recipe.searchByCategories(categories);
        } else {
            recipes = await Recipe.getRecipes();
        }

        return response.status(200).json({data: recipes});
    } catch (error) {
        next(error);
    }
});

recipes.get('/:id', validateRecipeID(), async (request, response, next) => {
    try {
        return response.status(200).json({data: request.recipe})
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

recipes.put('/:id', validateRecipe(), validateRecipeID(), async (request, response, next) => {
    try {
        let result = Recipe.editRecipe(request.params.id, request.recipeData);

        return response.status(200).json(result);
    } catch (error) {
        next(error);
    }
})

recipes.delete('/:id', validateRecipe(), validateRecipeID(), async (request, response, next) => {
    try {
        let result = Recipe.deleteRecipe(request.params.id);

        return response.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

// temporary route to test the model function
recipes.get('/users/:id', async (request, response, next) => {
    try {
        let recipes = await Recipe.getUserRecipes(request.params.id);

        return response.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
});

module.exports = recipes;
