require('dotenv').config();

const fastify = require('fastify')({
    logger: true
});

fastify.register(require('fastify-formbody'));
fastify.register(require('fastify-jwt'), {
    secret: process.env.JWT_SECRET_TOKEN
});
fastify.register(require('./middleware/auth'));
fastify.register(require('./routes'), {
    prefix: '/v1'
});

// fastify.addHook("onRequest", async (request, reply) => {
//     try {
//         await request.jwtVerify()
//     } catch (err) {
//         reply.send(err)
//     }
// })

const start = async () => {
    try {
        await fastify.listen(process.env.PORT || 3000);
        console.log(`Server listening on ${fastify.server.address().port}`)
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
};

start();