const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { seckretKey } = require('../utils/kluych');

const { WrongLoginDataError } = require('../customErrors/WrongLoginDataError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new WrongLoginDataError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : seckretKey,
    );
  } catch (e) {
    return next(new WrongLoginDataError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
