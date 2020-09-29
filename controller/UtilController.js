const fs = require('fs');
const pump = require('pump');
const path = require('path');

// upload path
const assetsModel = require('../models/AssetModel');

async function postUpload(request, reply) {
    try {
        const data = await request.file();
        // setup file name
        const originalName = data.filename;
        const hashFileName = this.util.hashFileNameWithExt(data.filename);
        const uploadPath = this.util.uploadPath();

        // insert filename to database
        const fileUpload = await assetsModel
            .query()
            .insert({
                user_id: request.user.id,
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
        const uploadPath = this.util.uploadPath();
        const originalName = part.filename;

        const fileUploads = await assetsModel
            .query()
            .insert([{
                original_name: originalName,
                hashed_name: hashFileName
            }]);

        for await (const part of parts) {
            const hashFileName = this.util.hashFileNameWithExt(part.filename);
            const fileUploads = path.join(uploadPath, hashFileName);
            await pump(part.file, fs.createWriteStream(fileUploads));
        }
        return reply.send({ message: 'Success' });
    } catch (error) {
        throw new Error(error);
    }
};

async function getDownload(request, reply) {
    try {
        const filename = request.params.filename
        reply.sendFile(filename);
    } catch (error) {
        throw new Error();
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
    // try {
    //     const files = request.body.file;
    //     for await (const file of files) {
    //         const fileToDelete = path.join(uploadPath, file);
    //         await fs.unlinkSync(fileToDelete);
    //     }

    //     return reply.code(200).send({ message: "Delete success" });
    // } catch (error) {
    //     throw new Error("Delete error");
    // }
    const up = this.util.hashFileNameWithExt('test.txt');
    return reply.send({ message: up })
};

module.exports = {
    postUpload,
    postUploads,
    getDownload,
    deleteUpload,
    deleteUploads
};