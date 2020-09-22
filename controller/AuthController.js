const boom = require('boom');
const bcrypt = require('bcrypt');
const res = require('./ResponseController');
const userModel = require('./../models/UserModel');

const salt = bcrypt.genSaltSync(10);

async function register(request, reply) {
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
}

async function login(request, reply) {
    const username = request.body.username;
    const password = bcrypt.hashSync(request.body.password, salt);

    const user = await userModel
        .query()
        .findOne({
            username: username
        });

    if (user) {
        const user_id = user.id;

        let result = bcrypt.compareSync(request.body.password, user.password)
        if (result) {
            const token = this.jwt.sign({ user_id }, { expiresIn: 86400 });
            // return res.ok(user, { token: token }, reply);
            return reply.send({ token: token, req: request.user })
        } else {
            return res.notFound("", "Password didn't match", reply);
        };
    } else {
        return res.notFound(user, "User not found", reply);
    };
};

async function validate(request, reply) {
    try {
        return res.ok("", "Successfully authenticated", reply);
    } catch (error) {
        return boom.boomify(error);
    }
}

async function generate(request, reply) {
    try {
        const user_id = request.body.user_id;
        const email = request.body.email;
        const password = request.body.password;

        if (!user_id || !email || !password) {
            return res.notFound("", "Identity is required", reply)
        }

        const userData = userModel
            .query()
            .findById(user_id)

        if (userData && userData.length > 0) {

        }

        const token = this.jwt.sign({ user_id, email, password }, { expiresIn: 86400 });
        return res.ok(token, "", reply)
    } catch (error) {
        throw boom.boomify(error)
    }
}

module.exports = {
    register,
    login,
    generate,
    validate
};