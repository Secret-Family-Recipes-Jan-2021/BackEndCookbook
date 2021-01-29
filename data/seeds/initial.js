const bcrypt = require('bcrypt');

const seedHashed = async (password) => {
    return bcrypt.hash(password, parseInt(process.env.HASH_ROUNDS));
};

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('users').del()
        .then(function () {
            let users = [
                    {id: 1, username: 'jameskirk', password: '12345'},
                    {id: 2, username: 'brian_r', password: '12345'},
                    {id: 3, username: 'babbish', password: '12345'},
                    {id: 4, username: 'yondu', password: '12345'},
                    {id: 5, username: 'curie', password: '12345'}
                ];

            let hashed = users.map(async (user) => {
               return {...user, password: await seedHashed(user.password)};
            });

            return Promise.all(hashed)
                .then((values) => {
                    return knex('users').insert(values);
                });
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
                {id: 3, category_name: 'breakfast'},
                {id: 4, category_name: 'lunch'},
                {id: 5, category_name: 'brunch'},
                {id: 6, category_name: 'second breakfast'},
                {id: 7, category_name: 'lembas'},
                {id: 8, category_name: 'spicy'},
                {id: 9, category_name: 'sweet'},
                {id: 10, category_name: 'sour'},
                {id: 11, category_name: 'munchies'},
                {id: 12, category_name: 'tea'},
                {id: 13, category_name: 'vegetarian'},
                {id: 14, category_name: 'probably safe'}
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
