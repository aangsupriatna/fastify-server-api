const res = require('./ResponseController')
const Boom = require('@hapi/boom')

const phoneModel = require('./../models/PhoneModel');

async function get(request, reply) {
    try {
        const phone = await phoneModel
            .query()
            .orderBy('user_id', 'ASC');

        return res.ok(phone, "", reply)
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

        return res.ok(phone, "Successfully add phone number", reply)
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

        return res.ok(phone, "", reply)
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

        return res.ok(person, "Successfully update phone number", reply)
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

        return res.ok(phone, "Successfully delete phone number", reply)
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