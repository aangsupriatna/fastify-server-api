const { Model } = require('objection');
const knex = require('./../connection');
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