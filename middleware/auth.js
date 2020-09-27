const fp = require("fastify-plugin");
const boom = require('boom');

module.exports = fp(async function (fastify, opts, done) {
    fastify.decorate("authenticate", async function (request, reply) {
        try {
            // const auth = request.session.authenticated;
            // if (auth) {
            //     done();
            // } else {
            //     throw boom.unauthorized("Unauthorized");
            // }
            await request.jwtVerify();
        } catch (err) {
            throw boom.boomify(err);
        }
    });
});