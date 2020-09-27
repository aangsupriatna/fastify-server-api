require('dotenv').config();

const fastify = require('fastify')({
    logger: true
});
const fastifyFormBody = require('fastify-formbody');
const fastifyCookie = require('fastify-cookie');
const fastifyJWT = require('fastify-jwt');
const fastifyHelmet = require('fastify-helmet');
const auth = require('./middleware/auth');

fastify.register(fastifyFormBody);
fastify.register(fastifyCookie);
fastify.register(fastifyJWT, {
    secret: process.env.JWT_SECRET,
    cookie: {
        cookieName: 'token'
    }
});

fastify.register(fastifyHelmet);

// Auth middleware
fastify.register(auth);

fastify.register(require('./routes'), {
    prefix: '/v1'
});

const start = async () => {
    try {
        await fastify.listen(process.env.PORT || 3000);
        console.log(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();