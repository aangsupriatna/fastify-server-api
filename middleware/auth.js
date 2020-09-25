const fastifyPlugin = require('fastify-plugin')

const sessionAuth = fastifyPlugin(async (fastify) => {
    // fastify.decorate('jwtauth', async (request, reply) => {
    //     try {
    //         // to whatever you want, read the token from cookies for example..
    //         const token = request.headers.authorization
    //         // reply.send(token)
    //         await request.jwtVerify()
    //     } catch (err) {
    //         reply.send(err)
    //     }
    // })
    fastify.decorate('sessionAuth', async (request, reply) => {
        try {
            const auth = request.session.authenticated;
            if (auth) {
                done();
            };
            done(new Error('No access'))
        } catch (error) {
            th
        };
    });
});

module.exports = sessionAuth