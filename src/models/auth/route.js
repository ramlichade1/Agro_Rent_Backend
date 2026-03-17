const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authGuard = require('../../middleware/authGuard')

router.post('/signup', authGuard, controller.signup);
router.post('/login', authGuard, controller.login);

module.exports = router;