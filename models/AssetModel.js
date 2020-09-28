const knex = require('../config/db');
const { Model } = require('objection');

Model.knex(knex);

const UserModel = require('./UserModel');

class AssetModel extends Model {
    static get tableName() {
        return 'assets'
    };

    static get relationMappings() {
        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: 'assets.user_id',
                    to: 'users.id'
                }
            }
        }
    };
};

module.exports = AssetModel