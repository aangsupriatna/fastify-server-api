const Boom = require('boom')

const phoneModel = require('./../models/PhoneModel');

async function get(request, reply) {
    try {
        const phones = await phoneModel
            .query()
            .orderBy('user_id', 'ASC');

        return reply.send(phones)
    } catch (error) {
        throw Boom.boomify(error)
    }
}

async function store(request, reply) {
    try {
        let userId = request.body.user_id;
        let phoneNum = request.body.phone;
        let description = request.body.description;

        const phone = await phoneModel
            .query()
            .insert({
                user_id: userId,
                phone_number: phoneNum,
                description: description
            });

        return reply.send({ value: phone, message: "New phone added" })
    } catch (error) {
        throw Boom.boomify(error)
    }
}

async function show(request, reply) {
    try {
        let user_id = request.params.user_id;

        const phone = await phoneModel
            .query()
            .where('user_id', '=', user_id);

        return reply.send(phone)
    } catch (error) {
        throw Boom.boomify(error)
    }
}

async function update(request, reply) {
    try {
        let phoneNum = request.body.phone;
        let id = request.body.id;
        let description = request.body.description;

        const person = await phoneModel
            .query()
            .findById(id)
            .patch({
                phone_number: phoneNum,
                description: description
            });

        return reply.send({ value: person, message: "Phone updated" })
    } catch (error) {
        throw Boom.boomify(error)
    }
}

async function destroy(request, reply) {
    try {
        let id = request.params.id

        const phone = await phoneModel
            .query()
            .deleteById(id);

        return reply.send({ value: phone });
    } catch (error) {
        throw Boom.boomify(error)
    }
}

module.exports = {
    get,
    show,
    destroy,
    store,
    update
};