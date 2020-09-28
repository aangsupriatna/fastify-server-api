const path = require('path');
const fp = require("fastify-plugin");
const crypto = require('crypto');

module.exports = fp(async function (fastify, opts, done) {
    fastify.decorate('util', {
        // get upload path
        uploadPath() {
            return path.join(__dirname, '..', 'uploads')
        },
        // hashed filename with extension
        hashFileNameWithExt(fileName) {
            const hashName = crypto
                .createHash('md5')
                .update(Math.random() + fileName)
                .digest("hex");

            const extName = path.extname(fileName);
            return hashName + extName;
        }
    });
});