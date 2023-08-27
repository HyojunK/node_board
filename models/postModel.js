const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '제목을 입력해주세요!'],
  },
  text: {
    type: String,
    required: [true, '내용을 입력해주세요!'],
  },
  writer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
