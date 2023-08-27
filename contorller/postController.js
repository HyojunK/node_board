const CustomError = require('../utils/customError');
const catchAsyncError = require('../utils/catchAsyncError');
const Post = require('../models/postModel');

exports.createPost = catchAsyncError(async (req, res, next) => {
  const newPost = await Post.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newPost,
    },
  });
});
