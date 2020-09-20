
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'John Doe', email: 'john@gmail.com'},
        {id: 2, name: 'Jane Doe', email: 'jane@gmail.com'},
        {id: 3, name: 'Neil Armstrong', email: 'neil@gmail.com'}
      ]);
    });
};
