const db = require('../../../data/dbConfig');

const getRecipes = () => {
    return db.table('recipes')
        .join('users','recipes.user_id', '=', 'users.id' )
        .select('recipes.id',
            'title',
            'source',
            'ingredients',
            'instructions',
            'username as author');
};

const getRecipeCategories = (id = false) => {
    if(!id) {
        return db.table('recipe_category_relation as rcr')
            .join('categories',
                'rcr.category_id',
                'categories.id');
    } else {
        return db.table('recipe_category_relation as rcr')
            .join('categories',
                'rcr.category_id',
                'categories.id')
            .where('rcr.recipe_id', id);
    }
};

const getRecipeByID = (id) => {
    return db.table('recipes')
        .join('users','recipes.user_id', '=', 'users.id' )
        .select('title',
            'source',
            'ingredients',
            'instructions',
            'username as author')
        .where('recipes.id', id)
        .first();
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

module.exports = {
    getRecipes,
    getRecipeCategories,
    getRecipeByID,
    addRecipe,
    editRecipe,
    deleteRecipe
};
