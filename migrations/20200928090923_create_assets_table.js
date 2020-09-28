
exports.up = function (knex) {
    return knex.schema.createTable('assets', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').index();
        table.string('original_name').notNullable();
        table.string('hashed_name').notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('assets');
};
