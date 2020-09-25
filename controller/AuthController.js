const boom = require('boom');
const bcrypt = require('bcrypt');
const res = require('./ResponseController');
const userModel = require('./../models/UserModel');

const salt = bcrypt.genSaltSync(10);

async function postRegister(request, reply) {
    const username = request.body.username;
    const email = request.body.email;
    const password = bcrypt.hashSync(request.body.password, salt);

    const newuser = await userModel
        .query()
        .insert({
            username: username,
            email: email,
            password: password
        });

    return res.ok(newuser, "Successfully add user", reply);
};

async function getLogin(request, reply) {
    const auth = request.session.authenticated;
    if (!auth) {
        return res.notFound(auth, "Auth required", reply);
    }

    return res.ok(auth, "You are authenticated", reply);
};

async function postLogin(request, reply) {
    const user = await userModel
        .query()
        .findOne({
            username: request.body.username
        });

    if (user) {
        const result = bcrypt.compareSync(request.body.password, user.password);
        if (result) {
            const auth = request.session.authenticated = true;
            return res.ok(auth, "User was authenticated", reply);
        } else {
            return res.notFound("", "Password didn't match", reply);
        }
    } else {
        return res.notFound("", "User not found", reply);
    }
};

async function postLogout(request, reply) {
    const authSession = request.session.authenticated;
    if (authSession) {
        request.destroySession(err => {
            if (err) {
                return boom.boomify(err);
            } else {
                return reply.send({ message: "Remove auth" });
            }
        });
    }
    return reply.send({ message: "Not auth" });
};

module.exports = {
    postRegister,
    postLogin,
    getLogin,
    postLogout
};