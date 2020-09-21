const res = require('./ResponseController')
const boom = require('boom')

const userModel = require('./../models/UserModel')

async function get(request, reply) {
    try {
        const users = await userModel
            .query()
            .eager('phone')
            .orderBy('name', 'ASC')

        return res.ok(users, "", reply)
    } catch (error) {
        throw boom.boomify(error)
    }
}

async function store(request, reply) {
    try {
        let name = request.body.name
        let email = request.body.email

        const users = await userModel
            .query()
            .insert({
                name: name,
                email: email
            });

        return res.ok(users, "Successfully add userssss", reply)
    } catch (error) {
        throw boom.boomify(error)
    }
}

async function show(request, reply) {
    try {
        let id = request.params.id

        const users = await userModel
            .query()
            .eager('phone')
            .findById(id)

        return res.ok(users, "", reply)
    } catch (error) {
        throw boom.boomify(error)
    }
}

async function update(request, reply) {
    try {
        let name = request.body.name
        let email = request.body.email
        let id = request.body.id

        const users = await userModel
            .query()
            .findById(id)
            .patch({
                name: name,
                email: email
            })

        return res.ok(users, "Successfully update users", reply)
    } catch (error) {
        throw boom.boomify(error)
    }
}

async function destroy(request, reply) {
    try {
        let id = request.params.id

        const users = await userModel
            .query()
            .deleteById(id)

        return res.ok(users, "Successfully delete users", reply)
    } catch (error) {
        throw boom.boomify(error)
    }
}

module.exports = {
    get,
    show,
    destroy,
    store,
    update
};