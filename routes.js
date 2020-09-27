let auth = require('./controller/AuthController');
let users = require('./controller/UserController');
let phone = require('./controller/PhoneController');

async function routes(fastify, options) {
    // Home
    fastify.get('/', { preValidation: [fastify.authenticate] }, (request, reply) => {
        reply.send({ user: request.user, massege: "Welcome, home" });
    });

    // Auth
    fastify.get('/login', { preValidation: [fastify.authenticate] }, auth.getLogin);
    fastify.post('/register', auth.postRegister);
    fastify.post('/login', auth.postLogin);
    fastify.post('/logout', auth.postLogout);

    // Users
    fastify.get('/users', { preValidation: [fastify.authenticate] }, users.get);
    fastify.get('/user/:id', { preValidation: [fastify.authenticate] }, users.show);
    fastify.post('/users', { preValidation: [fastify.authenticate] }, users.store);
    fastify.put('/users', { preValidation: [fastify.authenticate] }, users.update);
    fastify.delete('/user/:id', { preValidation: [fastify.authenticate] }, users.destroy);

    // Phones
    fastify.get('/phone', phone.get);
    fastify.get('/phone/:user_id', phone.show);
    fastify.post('/phone', phone.store);
    fastify.put('/phone', phone.update);
    fastify.delete('/phone/:id', phone.destroy);
};

module.exports = routes;