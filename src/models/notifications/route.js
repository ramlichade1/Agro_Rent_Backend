const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/count', controller.getCount);

module.exports = router;