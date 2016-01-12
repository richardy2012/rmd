
module.exports = {
    identity: 'user',
    attributes: {
        githubId: {
            type: 'string',
            unique: true,
            index: true
        },
        username: {
            type: 'string',
            unique: true,
            index: true
        },
        slug: {
            type: 'string',
            unique: true
        },
        avatar: {
            type: 'string'
        },
        email: {
            type: 'string',
            unique: true
        },
        password: {
            type: 'string'
        },
        signature: {
            type: 'string'
        },
        posts: {
            collection: 'post',
            via: 'owner'
        },
        medias: {
            collection: 'media',
            via: 'owner'
        }
    }
};