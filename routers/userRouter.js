const express = require('express');
const authController = require('../contorller/authController');

const router = express.Router();

router.post('/signup', authController.signup);

module.exports = router;
