const auth = require('../controller/AuthController');
const users = require('../controller/UserController');
const phone = require('../controller/PhoneController');
const util = require('../controller/UtilController');

async function routes(fastify, options) {
    // Home
    fastify.get('/', { preValidation: [fastify.auth] }, (request, reply) => {
        reply.send({ user: request.user, massege: "Welcome, home" });
    });

    // Upload
    fastify.post('/upload', { preValidation: [fastify.auth] }, util.postUpload);
    fastify.post('/uploads', util.postUploads);
    fastify.delete('/upload/delete/:id', util.deleteUpload);
    fastify.post('/uploads/delete', util.deleteUploads);

    // Download
    fastify.get('/download/:filename', util.getDownload);

    // Auth
    fastify.get('/login', { preValidation: [fastify.auth] }, auth.getLogin);
    fastify.post('/register', auth.postRegister);
    fastify.post('/login', auth.postLogin);
    fastify.post('/logout', auth.postLogout);

    // Users
    fastify.get('/users', { preValidation: [fastify.auth] }, users.get);
    fastify.get('/user/:id', { preValidation: [fastify.auth] }, users.show);
    fastify.post('/users', { preValidation: [fastify.auth] }, users.store);
    fastify.put('/users', { preValidation: [fastify.auth] }, users.update);
    fastify.delete('/user/:id', { preValidation: [fastify.auth] }, users.destroy);

    // Phones
    fastify.get('/phone', phone.get);
    fastify.get('/phone/:user_id', phone.show);
    fastify.post('/phone', phone.store);
    fastify.put('/phone', phone.update);
    fastify.delete('/phone/:id', phone.destroy);
};

module.exports = routes;