const Boom = require('boom')

const phoneModel = require('./../models/PhoneModel');

async function get(request, reply) {
    try {
        const phones = await phoneModel
            .query()
            .orderBy('user_id', 'ASC');

        return reply.send(phones);
    } catch (error) {
        throw Boom.boomify(error);
    };
};

async function store(request, reply) {
    try {
        const phone = await phoneModel
            .query()
            .insert({
                user_id: request.body.user_id,
                phone_number: request.body.phone,
                description: request.body.description
            });

        return reply.send({ message: "New phone added", phone });
    } catch (error) {
        throw Boom.boomify(error);
    };
};

async function show(request, reply) {
    try {
        const user_id = request.params.user_id;

        const phone = await phoneModel
            .query()
            .where('user_id', '=', user_id);

        return reply.send(phone);
    } catch (error) {
        throw Boom.boomify(error)
    };
};

async function update(request, reply) {
    try {
        const id = request.params.id;

        const person = await phoneModel
            .query()
            .findById(id)
            .patch(request.body);

        return reply.send({ message: "Phone updated", person })
    } catch (error) {
        throw Boom.boomify(error)
    };
};

async function destroy(request, reply) {
    try {
        const id = request.params.id

        const phone = await phoneModel
            .query()
            .deleteById(id);

        return reply.send({ value: phone });
    } catch (error) {
        throw Boom.boomify(error)
    };
};

module.exports = {
    get,
    show,
    destroy,
    store,
    update
};