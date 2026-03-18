const express = require('express');
const router = express.Router();

router.use('/auth', require('../models/auth/route'));
router.use('/products', require('../models/products/route'));
router.use('/notifications', require('../models/notifications/route'));

module.exports = router;