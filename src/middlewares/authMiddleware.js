const jwt = require('jsonwebtoken');
const { JWT_SECRET, HTTP_STATUS } = require('../constants/constants');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;
