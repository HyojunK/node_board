const User = require('../models/userModel');

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    role: req.body.role,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
};
