
exports.up = function (knex) {
    return knex.schema.createTable('phone', function (table) {
        table.increments('id').primary();
        table.string('phone_number').notNullable();
        table.string('description').notNullable();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').index();
        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('phone');
};
