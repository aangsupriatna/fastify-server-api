let auth = require('./controller/AuthController');
let users = require('./controller/UserController');
let phone = require('./controller/PhoneController');

async function routes(fastify, options) {
    fastify.post('/generateAccessToken', (request, reply) => {
        const token = fastify.jwt.sign({ hello: 'world' }, { expiresIn: 86400 });
        return reply.send({ token })
    });

    fastify.get('/routeValidation', {
        preValidation: [fastify.jwtauth]
    }, async (req, res) => {
        res.status(200).send({ msg: "Successfully authenticated" });
    });

    fastify.get('/users', users.get);
    fastify.get('/users/:id', users.show);
    fastify.post('/users', users.store);
    fastify.put('/users', users.update);
    fastify.delete('/users/:id', users.destroy);

    fastify.get('/phone', phone.get);
    fastify.get('/phone/:user_id', phone.show);
    fastify.post('/phone', phone.store);
    fastify.put('/phone', phone.update);
    fastify.delete('/phone/:id', phone.destroy);
}

module.exports = routes;