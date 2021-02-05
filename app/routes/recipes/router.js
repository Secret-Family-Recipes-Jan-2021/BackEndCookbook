const express = require('express');
const jwt = require('jsonwebtoken');

const Recipe = require('./model');

const { validateRecipe, validateRecipeID } = require('./middleware');

const recipes = express.Router();

// get all recipes
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

        return response.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
});

// get a recipe with given ID
recipes.get('/:id', validateRecipeID(), async (request, response, next) => {
    try {
        return response.status(200).json(request.recipe)
    } catch (error) {
        next(error);
    }
});

// create a new recipe
recipes.post('/', validateRecipe(), async (request, response, next) => {
    try {

        let recipe = await Recipe.addRecipe(request.recipeData);

        return response.status(201).json({message: 'recipe successfully created', recipe: recipe});
    } catch (error) {
        next(error);
    }
});

// edit a recipe with given ID
recipes.put('/:id', validateRecipe(), validateRecipeID(), async (request, response, next) => {
    try {
        let result = Recipe.editRecipe(request.params.id, request.recipeData);

        return response.status(200).json(result);
    } catch (error) {
        next(error);
    }
})

// delete a recipe with given ID
recipes.delete('/:id', validateRecipe(), validateRecipeID(), async (request, response, next) => {
    try {
        let result = Recipe.deleteRecipe(request.params.id);

        return response.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

// get a uri for the guest route, this should open to a specific recipe viewable by anyone with this link
recipes.get('/:id/token', validateRecipeID(), async (request, response, next) => {
    try {
        let url = `${request.protocol}://${request.get('host')}/guests?token=`;

        const token = jwt.sign({
            recipe_id: request.params.id,
        }, process.env.JWT_SECRET, {expiresIn: "7d"})

        return response.status(200).json({link: `${url}${token}`});
    } catch (error) {
        next(error);
    }
});

module.exports = recipes;
