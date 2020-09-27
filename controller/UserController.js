const Boom = require('boom');
const userModel = require('./../models/UserModel');

async function get(request, reply) {
    try {
        const users = await userModel
            .query()
            .eager('phone')
            .orderBy('id', 'ASC');

        return reply.send(users);
    } catch (error) {
        throw Boom.boomify(error);
    };
};

async function store(request, reply) {
    try {
        const user = await userModel
            .query()
            .insert(request.body);

        return reply.send({ message: "New user added", user });
    } catch (error) {
        throw Boom.boomify(error);
    };
};

async function show(request, reply) {
    try {
        let id = request.params.id;

        const user = await userModel
            .query()
            .eager('phone')
            .findById(id);

        return reply.send(user);
    } catch (error) {
        throw Boom.boomify(error);
    };
};

async function update(request, reply) {
    try {
        const id = request.params.id;

        const user = await userModel
            .query()
            .findById(id)
            .patch(request.body);

        return reply.send({ message: "User updated", user });
    } catch (error) {
        throw Boom.boomify(error);
    };
};

async function destroy(request, reply) {
    try {
        let id = request.params.id;

        const user = await userModel
            .query()
            .deleteById(id);

        return reply.send({ value: user });
    } catch (error) {
        throw Boom.boomify(error);
    };
};

module.exports = {
    get,
    show,
    destroy,
    store,
    update
};