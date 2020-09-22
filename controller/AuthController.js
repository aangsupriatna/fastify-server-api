const boom = require('boom');
const bcrypt = require('bcrypt');
const res = require('./ResponseController');
const userModel = require('./../models/UserModel');

async function register(request, reply) {
    const hashPwd = "$2b$10$dSkR8YMqQRsBHpmscPpMm.a5q0bGiw65IN.v6kbyRtFtRw7PHDU/e";
    const { username, email } = request.body;
    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync(request.body.password, salt);

    let result = bcrypt.compareSync(request.body.password, hashPwd);
    // if (bcrypt.compareSync('somePassword', hash)) {
    //     // Passwords match
    // } else {
    //     // Passwords don't match
    // }

    return res.ok(result, { salt: salt, password: password }, reply);
}
async function validate(request, reply) {
    try {
        return res.ok("", "Successfully authenticated", reply)
    } catch (error) {
        return boom.boomify(error)
    }
}

async function generate(request, reply) {
    try {
        const user_id = request.body.user_id
        const email = request.body.email
        const password = request.body.password

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
    generate,
    validate
};