const CustomError = require('../utils/customError');
const catchAsyncError = require('../utils/catchAsyncError');
const Comment = require('../models/commentModel');
const queryOptions = require('../utils/queryOptions');

exports.getAllComments = catchAsyncError(async (req, res, next) => {
  const postId = req.params.postId;
  console.log(req.params);
  const comments = await Comment.find({ post: postId });

  res.status(200).json({
    status: 'success',
    results: comments.length,
    data: {
      comments,
    },
  });
});

exports.createComment = catchAsyncError(async (req, res, next) => {
  req.body.post = req.params.postId;
  const newComment = await Comment.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      comment: newComment,
    },
  });
});
