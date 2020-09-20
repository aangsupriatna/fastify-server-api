require('dotenv').config();

const environment = process.env.NODE_ENV || 'development'
const config = require('./../knexfile')[environment]
const knex = require('knex')(config)
const { Model } = require('objection');
const UserModel = require('./UserModel');

Model.knex(knex);

class PhoneModel extends Model {

    static get tableName() {
        return 'phone';
    }

    static get relationMappings() {
        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: 'phone.user_id',
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = PhoneModel;