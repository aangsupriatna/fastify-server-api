require('dotenv').config();

const environment = process.env.NODE_ENV || 'development'
const config = require('./../knexfile')[environment]
const knex = require('knex')(config)
const { Model } = require('objection');

const PhoneModel = require('./PhoneModel');

Model.knex(knex);

class UserModel extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        return {
            phone: {
                relation: Model.HasManyRelation,
                modelClass: PhoneModel,
                join: {
                    from: 'users.id',
                    to: 'phone.user_id'
                }
            }
        };
    }
}

module.exports = UserModel;