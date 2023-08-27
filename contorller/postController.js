const CustomError = require('../utils/customError');
const catchAsyncError = require('../utils/catchAsyncError');
const Post = require('../models/postModel');
const QueryOptions = require('../utils/queryOptions');

exports.createPost = catchAsyncError(async (req, res, next) => {
  const newPost = await Post.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newPost,
    },
  });
});

exports.getAllPosts = catchAsyncError(async (req, res, next) => {
  const queryOptions = new QueryOptions(Post.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const posts = await queryOptions.query.select('-text');

  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts,
    },
  });
});

exports.getPost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new CustomError('존재하지 않는 게시물입니다.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
};
