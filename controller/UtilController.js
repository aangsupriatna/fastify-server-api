const fs = require('fs');
const pump = require('pump');
const path = require('path');
const crypto = require('crypto');
// upload path
const uploadPath = path.join(__dirname, '..', 'uploads');

const assetsModel = require('../models/AssetModel');

async function postUpload(request, reply) {
    try {
        const data = await request.file();
        // setup file name
        const originalName = data.filename;
        const hashName = crypto
            .createHash('md5')
            .update(Math.random() + data.filename)
            .digest("hex");
        const hashFileName = hashName + path.extname(data.filename);

        const fileUpload = await assetsModel
            .query()
            .insert({
                original_name: originalName,
                hashed_name: hashFileName
            });

        if (!fileUpload) throw new Error("Save upload data error");
        // save the file
        const fileUploadPath = path.join(uploadPath, fileUpload.hashed_name);
        await pump(data.file, fs.createWriteStream(fileUploadPath));
        return reply
            .code(200)
            .send({
                message: "Upload success"
            });
    } catch (error) {
        throw new Error(error);
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
        throw new Error(error);
    }
};

async function deleteUpload(request, reply) {
    try {
        const id = request.params.id;
        const asset = await assetsModel
            .query()
            .findById(id);

        if (!asset) throw new Error("Nothing to delete");

        // delete the file in db
        const del = await assetsModel.query()
            .deleteById(id);

        if (!del) throw new Error("Delete error");

        // delete the file            
        const fileToDelete = path.join(uploadPath, asset.hashed_name);
        await fs.unlinkSync(fileToDelete);

        return reply.code(200).send({ message: "Delete success" });
    } catch (error) {
        throw new Error(error)
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