
"use strict";


var Server = require('./server');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
function make(options){
    options = options || {};
    return Server(options);
}
module.exports = make;