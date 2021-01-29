
const validateRecipe = () => {
    return (request, response, next) => {
        try {
            let { instructions, ingredients, source, title, categories, user_id } = request.body;

            // TODO: get the user info from the token when login works
            // let user_id = request.token.user_id

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

module.exports = {
    validateRecipe,
};
