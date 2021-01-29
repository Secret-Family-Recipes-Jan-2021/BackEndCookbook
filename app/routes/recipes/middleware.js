
const validateRecipe = () => {
    return (request, response, next) => {
        try {
            let { instructions, ingredients, source, title, categories, user_id } = request.body;
            // let user_id = request.token.user_id

            if(!title) {
                return response.status(400).json({"message": "recipe title required"})
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
