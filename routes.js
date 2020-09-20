let users = require('./controller/UserController');
let phone = require('./controller/PhoneController');


async function routes (fastify, options) {
    fastify.get('/users', users.get);
    fastify.get('/users/:id', users.show);
    fastify.post('/users', users.store);
    fastify.put('/users', users.update);
    fastify.delete('/users', users.destroy);

    fastify.get('/phone', phone.get);
    fastify.get('/phone/:user_id', phone.show);
    fastify.post('/phone', phone.store);
    fastify.put('/phone', phone.update);
    fastify.delete('/phone', phone.destroy);
}

module.exports = routes;