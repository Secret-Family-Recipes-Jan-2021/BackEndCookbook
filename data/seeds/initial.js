exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                {id: 1, username: 'jameskirk', password: '12345'},
                {id: 2, username: 'brian_r', password: '12345'},
                {id: 3, username: 'babbish', password: '12345'}
            ]);
        });

    await knex('recipes').del()
        .then(function () {
            // Inserts seed entries
            return knex('recipes').insert([
                {
                    id: 1,
                    instructions: 'Get paper cup. Put dirt in it.',
                    ingredients: '1 paper cup. 1 scoop of dirt.',
                    source: 'Science Fair',
                    title: 'Cup of Dirt',
                    user_id: 2
                },
            ]);
        });

    await knex('categories').del()
        .then(function () {
            // Inserts seed entries
            return knex('categories').insert([
                {id: 1, category_name: 'joke'},
                {id: 2, category_name: 'dinner'},
                {id: 3, category_name: 'breakfast'}
            ]);
        });

    await knex('recipe_category_relation').del()
        .then(function () {
            // Inserts seed entries
            return knex('recipe_category_relation').insert([
                {recipe_id: 1, category_id: 1},
            ]);
        });
};
