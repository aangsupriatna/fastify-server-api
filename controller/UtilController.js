const fs = require('fs');
const pump = require('pump');
const path = require('path');

async function postUpload(request, reply) {
    const data = await request.file();
    const uploadPath = path.join(__dirname, '..', 'uploads', data.filename);

    const uploadFile = await pump(data.file, fs.createWriteStream(uploadPath));
    reply.send({ message: uploadPath, file: uploadFile });
    return;
};

async function postUploads(request, reply) {
    const parts = await request.files();

    for await (const part of parts) {
        const uploadPath = path.join(__dirname, '..', 'uploads', part.filename);
        await pump(part.file, fs.createWriteStream(uploadPath));
    }
    reply.send({ message: 'Success' });
    return;
};

module.exports = {
    postUpload,
    postUploads
};