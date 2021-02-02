const Recipe = require('./model');

const validateRecipe = () => {
    return (request, response, next) => {
        try {
            let { instructions, ingredients, source, title, categories} = request.body;
            let user_id = request.token.userId

            if(!title) {
                return response.status(400).json({message: 'recipe title required'});
            } else if(!Array.isArray(categories)) {
                return response.status(400).json({message: 'categories must be an array of category IDs'});
            } else {
                request.recipeData = {
                    title: title,
                    source: source,
                    ingredients: ingredients,
                    instructions: instructions,
                    user_id: user_id,
                    categories: categories
                }

                next();
            }
        } catch (error) {
            next(error);
        }
    };
};

const validateRecipeID = () => {
    return async (request, response, next) => {
        try {
            let recipe = await Recipe.getRecipeByID(request.params.id);

            if (recipe) {
                request.recipe = recipe;

                next();
            } else {
                return response.status(404).json({message: 'recipe not found'});
            }
        } catch (error) {
            next(error);
        }
    }
};

module.exports = {
    validateRecipe,
    validateRecipeID
};
