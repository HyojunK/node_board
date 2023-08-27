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

//------------------------------[ PRE MIDDLEWARE START ]------------------------------//
postSchema.pre(/^find/, function (next) {
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

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
