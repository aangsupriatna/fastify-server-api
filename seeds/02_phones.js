
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('phone').del()
        .then(function () {
            // Inserts seed entries
            return knex('phone').insert([
                { id: 1, user_id: '1', phone_number: '111111111111', description: 'John mobile number description' },
                { id: 2, user_id: '2', phone_number: '222222222222', description: 'Jane mobile number description' },
                { id: 3, user_id: '3', phone_number: '333333333333', description: 'Neil mobile number description' }
            ]);
        });
};
