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
                'username');

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

const getUserRecipes = async (user_id) => {
    let recipes = await db.table('recipes')
        .join('users','recipes.user_id', 'users.id' )
        .where('user_id', user_id)
        .select('recipes.id',
            'title',
            'source',
            'ingredients',
            'instructions',
            'username');

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
};

const getUserRecipeByID = async (user_id, recipe_id) => {
    let recipe = await db.table('recipes')
        .join('users','recipes.user_id', '=', 'users.id' )
        .select('title',
            'source',
            'ingredients',
            'instructions',
            'username')
        .where('recipes.id', recipe_id)
        .where('recipes.user_id', user_id)
        .first();

    let categories = await db.table('recipe_category_relation as rcr')
        .join('categories', 'rcr.category_id', 'categories.id')
        .select('categories.id as category_id', 'category_name as category')
        .where('rcr.recipe_id', recipe_id);

    return {...recipe, categories: categories};
};

const getRecipeByID = async (recipe_id) => {
    let recipe = await db.table('recipes')
        .join('users','recipes.user_id', '=', 'users.id' )
        .select('recipes.id as id',
            'title',
            'source',
            'ingredients',
            'instructions',
            'username')
        .where('recipes.id', recipe_id)
        .first();

    let categories = await db.table('recipe_category_relation as rcr')
        .join('categories', 'rcr.category_id', 'categories.id')
        .select('categories.id as category_id', 'category_name as category')
        .where('rcr.recipe_id', recipe_id);

    return {...recipe, categories: categories};
};

const addRecipe = async (data) => {
    let recipe = {
        title: data.title,
        source: data.source,
        ingredients: data.ingredients,
        instructions: data.instructions,
        user_id: data.user_id
    };
    let categories = data.categories;

    let [id] = await insertRecipe(recipe);
    console.log(id);

    let recipeCategory = await buildRecipeCategoryRelationData(id, categories);
    // console.log(recipeCategory);

    // let results = await insertRecipeCategories(recipeCategory);
    // console.log(results);

    return getRecipeByID(id);
};

const insertRecipe = (data) => {
    return db.table('recipes').insert(data, 'id');
};

const insertRecipeCategories = (data) => {
    return db.table('recipe_category_relation').insert(data);
};

const buildRecipeCategoryRelationData = (recipe_id, categories) => {
    let results = categories.map((category) => {
        return {recipe_id: recipe_id, category_id: parseInt(category)};
    });

    return Promise.all(results).then((values) => {
        return insertRecipeCategories(values);
    });
};

const editRecipe = async (recipe_id, data) => {
    let categories = data.categories;
    let recipe = {
        title: data.title,
        source: data.source,
        ingredients: data.ingredients,
        instructions: data.instructions,
        user_id: data.user_id
    };

    await db.table('recipes')
        .where('id', recipe_id)
        .update(recipe);

    let results = categories.map((category) => {
        return db.table('recipe_category_relation').insert({recipe_id: recipe_id, category_id: category});
    });

    Promise.all(results)
        .then((values) => {
            return getRecipeByID(recipe_id);
        })
        .catch((error) => {
            return error;
        });
};

const deleteRecipe = async (recipe_id) => {
    return db.table('recipes')
        .where('id', recipe_id)
        .delete();
}

const searchRecipes = async (term) => {
    try {
        return db.table('recipes').where('title', 'like', `%${term}%`);
    } catch (error) {
        return error;
    }
};

const searchByCategories = async (categoryArray) => {
    try {
        return db.table('recipe_category_relation as rcr')
            .join('recipes', 'rcr.recipe_id', 'recipes.id')
            .whereIn('rcr.category_id', categoryArray);
    } catch (error) {
        return error;
    }
};

const getRecipeCategories = async (recipe) => {
    let categories = await db.table('recipe_category_relation as rcr')
        .join('categories', 'rcr.category_id', 'categories.id')
        .select('categories.id as category_id', 'category_name as category')
        .where('rcr.recipe_id', recipe.id);

    return {...recipe, categories: categories};
};

module.exports = {
    getRecipes,
    getRecipeByID,
    getUserRecipes,
    getUserRecipeByID,
    addRecipe,
    editRecipe,
    deleteRecipe,
    searchRecipes,
    searchByCategories
};
