
module.exports = {
    identity: 'token',
    attributes: {
        access_token: {
            type: 'string',
            unique: true,
            index: true
        },
        expires: {
            type: 'string'
        }
    }
};