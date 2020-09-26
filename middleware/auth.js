const fp = require("fastify-plugin")

module.exports = fp(async function (fastify, opts, done) {
    fastify.decorate("authenticate", async function (request, reply) {
        try {
            const auth = request.session.authenticated;
            if (auth) {
                done();
            } else {
                throw new Error("Not authorized");
            }
        } catch (err) {
            reply.send(err);
        }
    })
})