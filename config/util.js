const path = require('path');
const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts, done) {
    fastify.decorate('util', {
        // get upload path
        uploadPath() {
            return path.join(__dirname, '..', 'uploads')
        },
        // hashed filename with extension
        hashFileNameWithExt(fileName) {
            const crypto = require('crypto');
            const hashName = crypto
                .createHash('md5')
                .update(Math.random() + fileName)
                .digest("hex");

            const extName = path.extname(fileName);
            return hashName + extName;
        }
    });

    fastify.decorateReply('sendFile', function (filename) {
        const fs = require('fs')
        const fileToDownload = path.join(__dirname, '..', 'uploads', filename);
        const stream = fs.createReadStream(fileToDownload);
        this.send(stream);
    });
});