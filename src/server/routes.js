const {
    getProtectedHandler, postLoginHandler,
    postTokenHandler, postLogoutHandler
} = require('./handler');

const routes = [
    {
        path: '/protected',
        method: 'GET',
        handler: getProtectedHandler,
    },{
        path: '/login',
        method: 'POST',
        handler: postLoginHandler,
        options: {
            auth: {
                mode: 'try',
            }
        }
    },
    {
        path: '/token',
        method: 'POST',
        handler: postTokenHandler,
        options: {
            auth: {
                mode: 'try',
            }
        }
    },
    {
        path: '/logout',
        method: 'DELETE',
        handler: postLogoutHandler,
        options: {
            auth: {
                mode: 'try',
            }
        }
    }
]

module.exports = routes;