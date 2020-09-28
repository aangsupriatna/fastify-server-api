
exports.up = function (knex) {
    return knex.schema.createTable('assets', function (table) {
        table.increments('id').primary();
        table.string('original_name').notNullable();
        table.string('hashed_name').notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('assets');
};
