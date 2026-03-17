const { AUTH_TOKEN } = require('../config/apiConfig');

function authGuard(req, res, next) {
  const authToken = req.headers['x-auth-token'];

  if (!authToken || authToken !== AUTH_TOKEN) {
    return res.status(401).json({
      success: false,
      message: 'Invalid auth token'
    });
  }

  next();
}

module.exports = authGuard;