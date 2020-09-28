const fs = require('fs');
const pump = require('pump');
const path = require('path');
const uploadPath = path.join(__dirname, '..', 'uploads');

async function postUpload(request, reply) {
    try {
        const data = await request.file();
        const fileUpload = path.join(uploadPath, data.filename);

        const uploadFile = await pump(data.file, fs.createWriteStream(fileUpload));
        return reply.send({ uploadFile });
    } catch (error) {
        throw new Error("Upload error");
    }
};

async function postUploads(request, reply) {
    try {
        const parts = await request.files();

        for await (const part of parts) {
            const fileUploads = path.join(uploadPath, part.filename);
            await pump(part.file, fs.createWriteStream(fileUploads));
        }
        return reply.send({ message: 'Success' });
    } catch (error) {
        throw new Error("Uploads error");
    }
};

async function deleteUpload(request, reply) {
    try {
        const file = request.params.file;
        const fileToDelete = path.join(uploadPath, file);
        await fs.unlinkSync(fileToDelete);

        return reply.code(200).send({ message: "Delete success" });
    } catch (error) {
        throw new Error("Delete error");
    }
};

async function deleteUploads(request, reply) {
    try {
        const files = request.body.file;
        for await (const file of files) {
            const fileToDelete = path.join(uploadPath, file);
            await fs.unlinkSync(fileToDelete);
        }

        return reply.code(200).send({ message: "Delete success" });
    } catch (error) {
        throw new Error("Delete error");
    }
};

module.exports = {
    postUpload,
    postUploads,
    deleteUpload,
    deleteUploads
};