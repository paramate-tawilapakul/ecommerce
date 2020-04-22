const User = require('../models/user');

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: 'User not found',
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
    (err, user) => {
      if (err) {
        return res.status(400).json({
          err,
        });
      }
      user.salt = undefined;
      user.hashed_password = undefined;
      res.json({ user });
    }
  );
};
