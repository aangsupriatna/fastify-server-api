const knex = require('../config/db');
const moment = require('moment')
const { Model } = require('objection')
Model.knex(knex)

const UserModel = require('./UserModel')

class PhoneModel extends Model {

    static get tableName() {
        return 'phone'
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

    $beforeUpdate() {
        this.updated_at = moment().format()
    }
}

module.exports = PhoneModel