// src/config/constants.js
require('dotenv').config();


const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  EXISTING: 409,
  INTERNAL_SERVER_ERROR: 500,
};


module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/todo_app',
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret_key',
  HTTP_STATUS,
};
