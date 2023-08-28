const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: [true, '존재하지 않는 게시물입니다.'],
  },
  text: {
    type: String,
    required: [true, '내용을 입력해주세요!'],
    maxLength: [100, '내용은 100자 이하로 작성해주세요!'],
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

//------------------------------[ PRE MIDDLEWARE START ]------------------------------//
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'writer',
    select: '-__v -email -role',
  });

  next();
});
//------------------------------[ PRE MIDDLEWARE END ]------------------------------//

//------------------------------[ POST MIDDLEWARE START ]------------------------------//
//------------------------------[ POST MIDDLEWARE END ]------------------------------//

//------------------------------[ METHODS START ]------------------------------//
//------------------------------[ METHODS END ]------------------------------//

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
