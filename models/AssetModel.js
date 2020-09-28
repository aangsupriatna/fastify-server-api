const knex = require('../config/db');
const moment = require('moment');
const { Model } = require('objection');

Model.knex(knex);

class AssetModel extends Model {
    static get tableName() {
        return 'assets'
    }

    $beforeUpdate() {
        this.updated_at = moment().format();
    };
}

module.exports = AssetModel