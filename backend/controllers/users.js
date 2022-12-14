const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const SALT_ROUNDS = 10;
const { NODE_ENV, JWT_SECRET } = process.env;
const { seckretKey } = require('../utils/kluych');

const { NotfoundIdError } = require('../customErrors/NotfoundIdError');
const { WrongDataError } = require('../customErrors/WrongDataError');
const { AlreadyExistsError } = require('../customErrors/AlreadyExistsError');

const {
  registerdStatus,
} = require('../utils/statusNumbers');

const validationError = 'ValidationError';
const castError = 'CastError';

module.exports.getUser = (req, res, next) => {
  const currentUserId = req.params.id || req.user._id;

  User.findById(currentUserId)
    .then((user) => {
      if (!user) {
        throw new NotfoundIdError('Объект с таким ID не найден');
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCridentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : seckretKey,
        { expiresIn: '7d' },
      );
      // const token = jwt.sign({ _id: user._id }, seckretKey, { expiresIn: '7d' });
      res.send({ token });
    }).catch((err) => {
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, SALT_ROUNDS).then((hash) => User.create({
    name, about, avatar, email, password: hash,
  }))
    .then(() => {
      res.status(registerdStatus)
        .send({
          user: {
            name, about, avatar, email,
          },
        });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new AlreadyExistsError(`Такой пользователь уже существует. Ошибка ${err.message}`));
      }
      if (err.name === validationError) {
        return next(new WrongDataError(`Переданы некорректные данные при создании пользователя. Ошибка ${err.message}`));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === validationError || err.name === castError) {
        return next(new WrongDataError(`Некорректные данные при обновлении профиля. Ошибка ${err.name} ${err.message}`));
      }
      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === validationError || err.name === castError) {
        return next(new WrongDataError(`Некорректные данные при обновлении аватара. Ошибка ${err.name} ${err.message}`));
      }
      return next(err);
    });
};
