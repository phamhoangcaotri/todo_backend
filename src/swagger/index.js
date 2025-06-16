const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const swaggerDef = require('./swaggerDef');

const options = {
  ...swaggerDef,
  apis: [
    path.join(__dirname, './docs/*.js'),           // Swagger JSDoc comments
    path.join(__dirname, './schemas/**/*.js'),     // Schema definitions as JSDoc
    path.join(__dirname, './components.parameters.yaml'),     // Optional: components (schemas, parameters, etc.) in YAML
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
