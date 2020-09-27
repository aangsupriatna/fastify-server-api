const Bcrypt = require('bcrypt');
const Boom = require('boom');
const userModel = require('./../models/UserModel');

async function postRegister(request, reply) {
    await userModel
        .query()
        .insert({
            username: request.body.username,
            email: request.body.email,
            password: request.body.password
        }).then(function (newUsr) {
            return reply.send({ message: "New user added", newUsr });
        }).catch(function (error) {
            throw Boom.boomify(error)
        })
};

async function getLogin(request, reply) {
    return reply.send({ message: `Hi ${request.user.username}, You are authorized` });
};

async function postLogin(request, reply) {
    try {
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
                    expiresIn: 60 * 5 //in second
                });
                return reply
                    .setCookie('token', token)
                    .code(200)
                    .send({
                        message: "Authenticated"
                    });
            } else {
                throw Boom.notFound("Wrong password");
            };
        } else {
            throw Boom.notFound("User not found");
        };
    } catch (error) {
        throw Boom.boomify(error);
    };
};

async function postLogout(request, reply) {
    try {
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
    } catch (error) {
        throw Boom.boomify(error);
    }
};

module.exports = {
    postRegister,
    postLogin,
    getLogin,
    postLogout
};