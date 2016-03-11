
"use strict";

const config = require('config');

class Server{
    constructor (rootApp){
        this.rootApp = rootApp;
    }
    start(externalApp){
        const root = externalApp ? externalApp : this.rootApp;
        root.on('error', (err) => {
            console.log(err);
        });
        return root.listen(3000, () => {
            console.log('server start on %s', 3000);
        });
    }
}
module.exports = Server;