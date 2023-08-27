const User = require('../models/userModel');
const CustomError = require('../utils/customError');
const jwt = require('jsonwebtoken');

const createAndSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(statusCode).json({
    status: 'success',
    token,
  });
};

// 회원가입
exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    role: req.body.role,
  });

  createAndSendToken(newUser, 201, res);
};

// 로그인
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) 이메일, 패스워드 입력 유효성 확인
  if (!email || !password) {
    return next(new CustomError('이메일과 비밀번호를 입력해주세요.', 400));
  }

  // 2) 사용자 존재 여부 확인 및 비밀번호 확인
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new CustomError('잘못된 이메일 혹은 비밀번호 입니다.', 401));
  }

  // 3) JWT 생성 및 전달(로그인)
  createAndSendToken(user, 200, res);
};
