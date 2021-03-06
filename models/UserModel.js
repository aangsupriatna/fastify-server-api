const knex = require('../config/db');
const moment = require('moment');
const bcrypt = require('bcrypt');

const { Model } = require('objection');
const PhoneModel = require('./PhoneModel');
const AssetModel = require('./AssetModel');

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
            },
            asset: {
                relation: Model.HasManyRelation,
                modelClass: AssetModel,
                join: {
                    from: 'users.id',
                    to: 'assets.user_id'
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