// Update with your config settings.
require('dotenv').config();

module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: 'migrations',
        },
        seeds: {
            directory: 'seeds'
        }
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST_PRODUCTION,
            user: process.env.DB_USERNAME_PRODUCTION,
            password: process.env.DB_PASSWORD_PRODUCTION,
            database: process.env.DB_DATABASE_PRODUCTION,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: 'migrations',
        },
        seeds: {
            directory: 'seeds'
        }
    }
};