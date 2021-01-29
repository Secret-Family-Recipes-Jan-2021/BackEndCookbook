const db = require('../../../data/dbConfig');

const RECIPES_TABLE = 'recipes';

const getRecipes = () => {
    return db.table(RECIPES_TABLE);
};

const getByID = (id) => {
    return db.table(RECIPES_TABLE)
        .where('id', id)
        .first();
};

const addRecipe = async (data) => {
    let [id] = db.table(RECIPES_TABLE)
        .insert(data);

    return getByID(id);
};

const editRecipe = async (id, data) => {
    await db.table(RECIPES_TABLE)
        .where('id', id)
        .update(data);

    return getByID(id);
};

const deleteRecipe = async (id) => {
    return db.table(RECIPES_TABLE)
        .where('id', id)
        .delete();
}

module.exports = {
    getRecipes,
    getByID,
    addRecipe,
    editRecipe,
    deleteRecipe
};
