require('dotenv').config();

const fastify = require('fastify')({
    logger: true
});
const fastifyFormBody = require('fastify-formbody');
const fastifyCookie = require('fastify-cookie');
const fastifySession = require('fastify-session');
const fastifyCors = require('fastify-cors');
const auth = require('./middleware/auth');
// const fastifyCsrf = require('fastify-csrf');

fastify.register(fastifyFormBody);
fastify.register(fastifyCookie);
fastify.register(fastifySession, {
    cookieName: 'sessionId',
    secret: process.env.SESSION_KEY,
    cookie: { secure: false },
    expires: 3600000
});

fastify.register(fastifyCors, {
    origin: '*',
});

fastify.register(auth);

fastify.register(require('./routes'), {
    prefix: '/v1'
});

fastify.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
    try {
        const json = JSON.parse(body);
        done(null, json);
    } catch (err) {
        err.statusCode = 400;
        done(err, undefined);
    }
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