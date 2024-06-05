const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const dotenv = require('dotenv');

const RetrievalError = require('../exceptions/RetrievalError');

dotenv.config();

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
    })

    await server.register([
        {
            plugin: require('@hapi/jwt')
        }
    ])

    server.auth.strategy('jwt_strategy', 'jwt', {
        keys: process.env.ACCESS_TOKEN_SECRET,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            nbf: true,
            maxAgeSec: 0,
            timeSkewSec: 0,
        },
        validate: async (artifacts, request, h) => {

            const { username } = (artifacts.decoded.payload);

            return {
                isValid: true,
                credentials: {
                    username: username
                }
            };
        }
    })

    server.ext('onPreResponse', (request, h)=>{
        const response = request.response;

        if(response instanceof Error){

            if(response instanceof RetrievalError){
                console.error(response.stack);
                const newResponse = h.response({
                    status: 'fail',
                    message: `${response.message}`,
                })

                newResponse.code(response.errorCode);
                return newResponse;
            }
            
        }

        return h.continue;
    })

    server.auth.default('jwt_strategy');
    
    server.route(routes);

    
    await server.start();
    console.log(`Server started at ${server.info.uri}`);
}

init();