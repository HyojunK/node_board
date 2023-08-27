const express = require('express');
const postController = require('../contorller/postController');

const router = express.Router();

router.route('/').post(postController.createPost);

module.exports = router;
