// app.js
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middlewares/authMiddleware');
const { MONGODB_URI } = require('./constants/constants');
require('dotenv').config();

const app = express();

const { swaggerUi, swaggerSpec } = require('./config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

// Kết nối MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/todos', authMiddleware, todoRoutes);

module.exports = app;
