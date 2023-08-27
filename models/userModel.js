const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, '이메일을 입력해 주세요!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, '올바른 이메일 형식을 입력해 주세요!'],
  },
  password: {
    type: String,
    required: [true, '비밀번호를 입력해 주세요!'],
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: [true, '이름을 입력해주세요!'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

//------------------------------[ PRE MIDDLEWARE START ]------------------------------//
// 비밀번호 암호화
userSchema.pre('save', async function (next) {
  // 비밀번호 필드의 변경 여부 확인
  if (!this.isModified('password')) return next();

  // 암호화
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
//------------------------------[ PRE MIDDLEWARE END ]------------------------------//

//------------------------------[ POST MIDDLEWARE START ]------------------------------//
//------------------------------[ POST MIDDLEWARE END ]------------------------------//

//------------------------------[ METHODS START ]------------------------------//
userSchema.methods.checkPassword = async function (currentPassword, password) {
  return await bcrypt.compare(currentPassword, password);
};
//------------------------------[ METHODS END ]------------------------------//

const User = mongoose.model('User', userSchema);
module.exports = User;
