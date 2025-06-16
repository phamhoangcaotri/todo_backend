const express = require('express');
const mongoose = require('mongoose');
const { AuthRoute, TodoRoute } = require('./routes/routes');
const authMiddleware = require('./middlewares/authMiddleware');
const { MONGODB_URI } = require('./constants/constants');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());

// Swagger setup (nên để sau middleware chính)
const { swaggerUi, swaggerSpec } = require('./swagger/index');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes (nên prefix với /api)
app.use('/api/auth', AuthRoute);
app.use('/api/todos', authMiddleware, TodoRoute);

module.exports = app;
