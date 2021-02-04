const bcrypt = require('bcrypt');

const SALT = process.env.HASH_ROUNDS ? parseInt(process.env.HASH_ROUNDS) : 10;

const seedHashed = async (password) => {
    return bcrypt.hash(password, SALT);
};

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('users').del()
        .then(function () {
            let users = [
                    {username: 'jameskirk', password: '12345'},
                    {username: 'brian_r', password: '12345'},
                    {username: 'babbish', password: '12345'},
                    {username: 'yondu', password: '12345'},
                    {username: 'curie', password: '12345'}
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
                {category_name: 'joke'},
                {category_name: 'dinner'},
                {category_name: 'breakfast'},
                {category_name: 'lunch'},
                {category_name: 'brunch'},
                {category_name: 'second breakfast'},
                {category_name: 'lembas'},
                {category_name: 'spicy'},
                {category_name: 'sweet'},
                {category_name: 'sour'},
                {category_name: 'munchies'},
                {category_name: 'tea'},
                {category_name: 'vegetarian'},
                {category_name: 'probably safe'}
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
