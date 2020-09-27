const environment = process.env.NODE_ENV || 'development';
const config = require('./../knexfile')[environment];
const knex = require('knex')(config);
const moment = require('moment');
const bcrypt = require('bcrypt');

const { Model } = require('objection');
const PhoneModel = require('./PhoneModel');

Model.knex(knex);

class UserModel extends Model {
    static get tableName() {
        return 'users'
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
    };

    $beforeInsert() {
        this.password = bcrypt.hashSync(this.password, 10);
        this.role = 'member';
    };

    $beforeUpdate() {
        this.password = bcrypt.hashSync(this.password, 10);
        this.updated_at = moment().format();
    };
};

module.exports = UserModel