const fastifyPlugin = require('fastify-plugin')

const jwtAuth = fastifyPlugin(async (fastify) => {
    fastify.decorate('jwtauth', async (request, reply) => {
        try {
            // to whatever you want, read the token from cookies for example..
            const token = request.headers.authorization
            // reply.send(token)
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })
})
module.exports = jwtAuth