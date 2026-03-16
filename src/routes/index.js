const express = require('express');
const router = express.Router();

router.use('/auth', require('../modules/auth/route'));
router.use('/farmer', require('../modules/farmer/route'));
router.use('/businessman', require('../modules/businessman/route'));

module.exports = router;