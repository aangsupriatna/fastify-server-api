const environment = process.env.NODE_ENV || 'development'
const config = require('./../knexfile')[environment]
const knex = require('knex')(config)
const moment = require('moment')

const { Model } = require('objection')
const PhoneModel = require('./PhoneModel')

Model.knex(knex)

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
    }

    $beforeUpdate() {
        this.updated_at = moment().format()
    }
}

module.exports = UserModel