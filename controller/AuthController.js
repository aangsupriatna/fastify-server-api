const Boom = require('@hapi/boom')
const res = require('./ResponseController')
const userModel = require('./../models/UserModel')

async function generate(request, reply) {
    try {
        const user_id = request.body.user_id
        const email = request.body.email
        const password = request.body.password

        if (!user_id || !email || !password) {
            return res.notFound("", "Identity is required", reply)
        }

        const userData = userModel
            .query()
            .findById(user_id)

        if (userData && userData.length > 0) {

        }

        // const token = fastify.jwt.sign({ user_id, email, password }, { expiresIn: 86400 });
        return res.ok("", userData, reply)
    } catch (error) {
        throw Boom.boomify(error)
    }
}

module.exports = {
    generate
};