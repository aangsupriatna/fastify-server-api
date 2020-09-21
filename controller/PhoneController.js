const res = require('./ResponseController')
const phoneModel = require('./../models/PhoneModel');

async function get(request, reply) {
    const phone = await phoneModel
        .query()
        .orderBy('user_id', 'ASC');

        return res.ok(phone, "", reply)
}

async function store(request, reply) {
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
}

async function show(request, reply) {
    let id = request.params.user_id;

    const phone = await phoneModel
        .query()
        .where('user_id', '=', id);

    return res.ok(phone, "", reply)
}

async function update(request, reply) {
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
}

async function destroy(request, reply) {
    const phone = await phoneModel
        .query()
        .deleteById(request.body.id);

    return res.ok(phone, "Successfully delete phone number", reply)
}

module.exports = {
    get,
    show,
    destroy,
    store,
    update
};