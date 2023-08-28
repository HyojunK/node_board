const express = require('express');
const commentController = require('../contorller/commentController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(commentController.getAllComments)
  .post(commentController.createComment);

module.exports = router;
