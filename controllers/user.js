const User = require('../models/user');

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  req.profile.salt = undefined;
  req.profile.hashed_password = undefined;
  return res.json({
    profile: req.profile,
  });
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true }, // return updated data
    (error, user) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      user.salt = undefined;
      user.hashed_password = undefined;
      res.json({ user });
    }
  );
};
