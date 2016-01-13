
"use strict";

var _ = require('lodash');
var config = require('config');
var os = require('os');
var path = require('path');
var fs = require('co-fs');
var parse = require('co-busboy');
var saveTo = require('save-to');
var moment = require('moment');
var media = require('./media');

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
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
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

            var parts = parse(this);

            // create a temporary folder to store files
            var date = moment().format('YYYY/MM').valueOf();
            var tmpdir = path.join(path.join(config.get('upload.directory'), 'upload', date));

            // make the temporary directory
            yield mkdir(tmpdir);

            // list of all the files
            var files = [];
            var file;

            // yield each part as a stream
            var part;
            while (part = yield parts) {
                // filename for this part
                var ext = path.extname(part.filename) || '.png';
                file = path.join(tmpdir, Math.random().toString(36).slice(2) + ext);
                var url = file.replace(config.get('upload.directory'), '');
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
            var data = object.data;
            var date = moment().format('YYYY/MM').valueOf();
            var tmpdir = path.join(path.join(config.get('upload.directory'), 'upload', date));
            yield mkdir(tmpdir);

            var buffer = decodeBase64Image(data);
            var file = path.join(tmpdir, Math.random().toString(36).slice(2) + '.png');
            var url = file.replace(config.get('upload.directory'), '');

            yield fs.writeFile(file, buffer.data);

            return {ret: 0, msg: 'ok', data: url};
        };
    }
};