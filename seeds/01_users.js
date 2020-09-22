const bcrypt = require('bcrypt');

exports.seed = function (knex) {
    // Deletes ALL existing entries
    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync('123456', salt);
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                { id: 1, username: 'john', email: 'john@gmail.com', password: password },
                { id: 2, username: 'jane', email: 'jane@gmail.com', password: password },
                { id: 3, username: 'neil', email: 'neil@gmail.com', password: password }
            ]);
        });
};
