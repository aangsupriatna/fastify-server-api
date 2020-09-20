require('dotenv').config();

var knex = require('knex')({
    client: 'mysql',
    connection: {
      host:     process.env.DB_HOST,
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    pool: {
      min: 2,
      max: 10
    },
});

module.exports = knex;