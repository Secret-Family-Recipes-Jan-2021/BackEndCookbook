const db = require('../../../data/dbConfig');

const getRecipes = async () => {
    try {
        let recipes = await db.table('recipes')
            .join('users','recipes.user_id', 'users.id' )
            .select('recipes.id',
                'title',
                'source',
                'ingredients',
                'instructions',
                'username as author');

        let categories = recipes.map((recipe) => {
            return getRecipeCategories(recipe);
        });

        return Promise.all(categories)
            .then((values) => {
                return values
            })
            .catch((error) => {
                console.log(error)
            });
    } catch (error) {
        return error;
    }
};

const getRecipeByID = async (id) => {
    let recipe = await db.table('recipes')
        .join('users','recipes.user_id', '=', 'users.id' )
        .select('title',
            'source',
            'ingredients',
            'instructions',
            'username as author')
        .where('recipes.id', id)
        .first();

    return getRecipeCategories(recipe);
};

const addRecipe = async (data) => {
    let [id] = db.table('recipes')
        .insert(data);

    return getByID(id);
};

const editRecipe = async (id, data) => {
    await db.table('recipes')
        .where('id', id)
        .update(data);

    return getByID(id);
};

const deleteRecipe = async (id) => {
    return db.table('recipes')
        .where('id', id)
        .delete();
}

const getRecipeCategories = async (recipe) => {
    let categories = await db.table('recipe_category_relation as rcr')
        .join('categories',
            'rcr.category_id',
            'categories.id')
        .select('categories.id as category_id',
            'category_name as category')
        .where('rcr.recipe_id', recipe.id);

    return {...recipe, categories: categories};
};

module.exports = {
    getRecipes,
    getRecipeByID,
    addRecipe,
    editRecipe,
    deleteRecipe
};
