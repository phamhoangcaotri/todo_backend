const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('../routes/');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ToDo API',
      version: '1.0.0',
      description: 'API documentation for ToDo App',
    },
    servers: [
      {
        url: 'https://todobackend-production-5f4c.up.railway.app/api',
      },
    ],
  },
  apis: ['../routes/*.js'], // <-- phải đúng path thật sự của file routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };