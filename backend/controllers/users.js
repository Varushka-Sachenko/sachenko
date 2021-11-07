const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const DataError = require('../errors/dataError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const {
        name, about, avatar, email,
      } = req.body;
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.status(200).send({
          data: {
            name: user.name, about: user.about, avatar: user.avatar, email: user.email,
          },
        }))
        .catch((err) => {
          if (err.name === 'MongoServerError' && err.code === 11000) {
            next(new ConflictError('Пользователь с данным email уже существует'));
          }
          if (err.name === 'CastError' || (err.name === 'ValidationError')) {
            next(new DataError('Неправильные данные'));
          }
          next(err);
        });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.findUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователя не существует'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Неправильные данные'));
      }
      return next(err);
    });
};

module.exports.changeInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || (err.name === 'ValidationError')) {
        next(new DataError('Неправильные данные'));
      }
      return next(err);
    });
};

module.exports.changeAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || (err.name === 'ValidationError')) {
        next(new DataError('Неправильные данные'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  User.findUser(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
      return res.send({ token });
    })
    .catch(() => next(new UnauthorizedError('Неправильная почта или пароль')));
};

module.exports.myInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};
