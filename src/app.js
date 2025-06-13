const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middlewares/authMiddleware');
const { MONGODB_URI } = require('./constants/constants');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());

// Swagger setup (nên để sau middleware chính)
const { swaggerUi, swaggerSpec } = require('./config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes (nên prefix với /api)
app.use('/api/auth', authRoutes);
app.use('/api/todos', authMiddleware, todoRoutes);

module.exports = app;
