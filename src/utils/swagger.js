// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Moassel API',
        description: 'API docs for Moassel app',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = '../swagger-output.json';
const endpointsFiles = ['../app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
