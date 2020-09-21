const fastifyPlugin = require('fastify-plugin')

const jwtAuth = fastifyPlugin(async (fastify) => {
    fastify.decorate('jwtauth', async (req, res) => {
        try {
            await req.jwtVerify()
        } catch (error) {
            res.send(error)
        }
    })
})
module.exports = jwtAuth