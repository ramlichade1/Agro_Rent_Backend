const { API_TOKEN } = require('../config/apiConfig');

module.exports = (req, res, next) => {
  const token = req.headers['x-api-token'];

  if (!token || token !== API_TOKEN) {
    return res.status(501).json({
      success: false,
      message: 'Unauthorized access'
    });
  }

  next();
};