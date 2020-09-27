const Boom = require('boom');
const userModel = require('./../models/UserModel');

async function get(request, reply) {
    await userModel
        .query()
        .eager('phone')
        .orderBy('id', 'ASC')
        .then(users => {
            return reply.send(users);
        }).catch(error => {
            throw Boom.boomify(error);
        });
};

async function store(request, reply) {
    await userModel
        .query()
        .insert(request.body)
        .then(user => {
            return reply.send({ message: "New user added", user })
        }).catch(error => {
            throw Boom.boomify(error);
        });
};

async function show(request, reply) {
    const id = request.params.id;
    await userModel
        .query()
        .eager('phone')
        .findById(id)
        .then(user => {
            return reply.send(user);
        }).catch(error => {
            throw Boom.boomify(error);
        });
};

async function update(request, reply) {
    const id = request.params.id;
    await userModel
        .query()
        .findById(id)
        .patch(request.body)
        .then(user => {
            return reply.send({ message: "User updated", user });
        }).catch(error => {
            throw Boom.boomify(error);
        });
};

async function destroy(request, reply) {
    const id = request.params.id;
    await userModel
        .query()
        .deleteById(id)
        .then(user => {
            return reply.send({ value: user });
        }).catch(error => {
            throw Boom.boomify(error);
        });
};

module.exports = {
    get,
    show,
    destroy,
    store,
    update
};