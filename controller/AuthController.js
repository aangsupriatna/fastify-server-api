const Bcrypt = require('bcrypt');
const userModel = require('./../models/UserModel');
const Boom = require('boom');

async function postRegister(request, reply) {
    const newUser = await userModel
        .query()
        .insert({
            username: request.body.username,
            email: request.body.email,
            password: request.body.password
        });

    return reply.send({ message: "New user added", newUser });
};

async function getLogin(request, reply) {
    return reply.send({ message: `Hi ${request.user.username}, You are authorized` });
};

async function postLogin(request, reply) {
    const user = await userModel
        .query()
        .findOne({
            username: request.body.username
        });

    if (user) {
        const result = Bcrypt.compareSync(request.body.password, user.password);
        if (result) {
            const token = await reply.jwtSign({
                id: user.id,
                username: user.username
            }, {
                expiresIn: 60
            });
            return reply
                .setCookie('token', token)
                .code(200)
                .send({
                    message: "Authenticated"
                });
        } else {
            throw Boom.notFound("Wrong password");
        }
    } else {
        throw Boom.notFound("User not found");
    }
};

async function postLogout(request, reply) {
    const authSession = request.session.authenticated;
    if (authSession) {
        request.destroySession(err => {
            if (err) {
                return Boom.boomify(err);
            } else {
                return reply.send({ message: "Auth removed" });
            }
        });
    }
    throw Boom.unauthorized("Unauthorized");
};

module.exports = {
    postRegister,
    postLogin,
    getLogin,
    postLogout
};