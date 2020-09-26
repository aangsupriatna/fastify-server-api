const Bcrypt = require('bcrypt');
const userModel = require('./../models/UserModel');
const Boom = require('boom');

const salt = Bcrypt.genSaltSync(10);

async function postRegister(request, reply) {
    const username = request.body.username;
    const email = request.body.email;
    const password = Bcrypt.hashSync(request.body.password, salt);

    const newuser = await userModel
        .query()
        .insert({
            username: username,
            email: email,
            password: password
        });

    return reply.send({ user: newuser, message: "New user added" });
};

async function getLogin(request, reply) {
    return reply.send({ message: "Congratulation" });
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
            const auth = request.session.authenticated = true;
            return reply.send({ value: auth, message: "Authenticated" });
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