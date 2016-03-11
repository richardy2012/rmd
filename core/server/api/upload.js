
"use strict";

const _ = require('lodash');
const config = require('config');
const os = require('os');
const path = require('path');
const fs = require('co-fs');
const parse = require('co-busboy');
const saveTo = require('save-to');
const moment = require('moment');
const media = require('./media');

/**
 * like mkdir -p
 * @param dir
 * @param mode
 */
function *mkdir(dir, mode) {
    if (yield fs.exists(dir)) {
        return;
    }

    try {
        yield fs.mkdir(dir, mode);
    }
    catch (e) {
        yield mkdir(path.dirname(dir), mode);
        yield mkdir(dir, mode);
    }
}

function decodeBase64Image(dataString) {
    const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

module.exports = {
    index: function (){
        return function *() {

            const parts = parse(this);

            // create a temporary folder to store files
            const date = moment().format('YYYY/MM').valueOf();
            const tmpdir = path.join(path.join(config.get('upload.directory'), 'upload', date));

            // make the temporary directory
            yield mkdir(tmpdir);

            // list of all the files
            const files = [];
            let file;

            // yield each part as a stream
            let part;
            while (part = yield parts) {
                // filename for this part
                const ext = path.extname(part.filename) || '.png';
                file = path.join(tmpdir, Math.random().toString(36).slice(2) + ext);
                const url = file.replace(config.get('upload.directory'), '');
                files.push(url);

                // save the file
                yield saveTo(part, file);

                // save to db
                yield media.add({
                    name: part.filename,
                    url: url,
                    type: ext
                });
            }



            return {ret: 0, msg: 'ok', data: files[0]};
        };
    },
    base64: function (object, options){
        return function *(){
            const data = object.data;
            const date = moment().format('YYYY/MM').valueOf();
            const tmpdir = path.join(path.join(config.get('upload.directory'), 'upload', date));
            yield mkdir(tmpdir);

            const buffer = decodeBase64Image(data);
            const file = path.join(tmpdir, Math.random().toString(36).slice(2) + '.png');
            const url = file.replace(config.get('upload.directory'), '');

            yield fs.writeFile(file, buffer.data);

            return {ret: 0, msg: 'ok', data: url};
        };
    }
};