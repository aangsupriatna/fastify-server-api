const res = require('./ResponseController')
const userModel = require('./../models/UserModel');

async function get(request, reply) {
    const users = await userModel
        .query()
        .eager('phone')
        .orderBy('name', 'ASC');

    return res.ok(users, "", reply)
}

async function store(request, reply) {
    let name = request.body.name;
    let email = request.body.email;

    const users = await userModel
        .query()
        .insert({
            name: name,
            email: email
        });

    return res.ok(users, "Successfully add userssss", reply)
}

async function show(request, reply) {
    let id = request.params.id;

    const users = await userModel
        .query()
        .eager('phone')
        .findById(id);

    return res.ok(users, "", reply)
}

async function update(request, reply) {
    let name = request.body.name;
    let email = request.body.email;
    let id = request.body.id;

    const users = await userModel
        .query()
        .findById(id)
        .patch({
            name: name,
            email: email
        });

    return res.ok(users, "Successfully update users", reply)
}

async function destroy(request, reply) {
    const users = await userModel
        .query()
        .deleteById(request.body.id);

    return res.ok(users, "Successfully delete users", reply)
}

module.exports = {
    get,
    show,
    destroy,
    store,
    update
};