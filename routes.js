let auth = require('./controller/AuthController');
let users = require('./controller/UserController');
let phone = require('./controller/PhoneController');

async function routes(fastify, options) {
    fastify.post('/generateAccessToken', auth.generate);

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