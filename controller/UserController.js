const res = require('./ResponseController');
const boom = require('boom');
const bcrypt = require('bcrypt');

const userModel = require('./../models/UserModel');
const sessionAuth = require('../middleware/auth');

async function get(request, reply) {
    if (request.session.authenticated) {
        try {
            const users = await userModel
                .query()
                .eager('phone')
                .orderBy('id', 'ASC');

            return res.ok(users, request.user, reply);
        } catch (error) {
            throw boom.boomify(error);
        }
    } else {
        throw boom.boomify(new Error("Winter is coming"));
    }
}

async function store(request, reply) {
    try {
        const username = request.body.username;
        const email = request.body.email;

        const salt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(request.body.password, salt);

        const users = await userModel
            .query()
            .insert({
                username: username,
                email: email,
                password: password
            });

        return res.ok(users, "Successfully add users", reply);
    } catch (error) {
        throw boom.boomify(error);
    }
}

async function show(request, reply) {
    try {
        let id = request.params.id;

        const users = await userModel
            .query()
            .eager('phone')
            .findById(id);

        return res.ok(users, "", reply);
    } catch (error) {
        throw boom.boomify(error);
    }
}

async function update(request, reply) {
    try {
        const username = request.body.username;
        const email = request.body.email;
        const id = request.body.id;

        const salt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(request.body.password, salt);

        const users = await userModel
            .query()
            .findById(id)
            .patch({
                username: username,
                email: email,
                password: password
            });

        return res.ok(users, "Successfully update users", reply);
    } catch (error) {
        throw boom.boomify(error);
    }
}

async function destroy(request, reply) {
    try {
        let id = request.params.id;

        const users = await userModel
            .query()
            .deleteById(id);

        return res.ok(users, "Successfully delete users", reply);
    } catch (error) {
        throw boom.boomify(error);
    }
}

module.exports = {
    get,
    show,
    destroy,
    store,
    update
};