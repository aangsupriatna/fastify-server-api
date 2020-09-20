
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('phone').del()
    .then(function () {
      // Inserts seed entries
      return knex('phone').insert([
        {id: 1, user_id: '1', phone_number: '08123456789', description: 'John mobile number description'},
        {id: 2, user_id: '2', phone_number: '0987654321', description: 'Jane mobile number description'},
        {id: 3, user_id: '3', phone_number: '08111111111', description: 'Neil mobile number description'}
      ]);
    });
};
