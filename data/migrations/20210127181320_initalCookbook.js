
exports.up = async function(knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
    });

    await knex.schema.createTable('recipes', (table) => {
        table.increments();
        table.string('instructions');
        table.string('ingredients');
        table.string('source');
        table.string('title').notNullable().unique();
        table.integer('user_id')
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .notNullable();
    });

    await knex.schema.createTable('categories', (table) => {
        table.increments();
        table.string('category_name').notNullable().unique();
    });

    await knex.schema.createTable('recipe_category_relation', (table) => {
        table.integer('recipe_id')
            .references('id')
            .inTable('recipes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .notNullable();

        table.integer('category_id')
            .references('id')
            .inTable('categories')
            .onUpdate('CASCADE')
            .onUpdate('CASCADE')
            .notNullable();
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('users');
    await knex.schema.dropTableIfExists('recipes');
    await knex.schema.dropTableIfExists('categories');
    await knex.schema.dropTableIfExists('recipe_category_relation');
};
