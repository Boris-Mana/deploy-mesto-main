const Card = require('../models/card');

const { NotfoundIdError } = require('../customErrors/NotfoundIdError');
const { WrongDataError } = require('../customErrors/WrongDataError');
const { NotYourCardError } = require('../customErrors/NotYourCardError');

const { deleteSuccessStatus } = require('../utils/statusNumbers');

const validationErrorName = 'ValidationError';
const castErrorName = 'CastError';

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === validationErrorName) {
        next(new WrongDataError(`Переданы некорректные данные для получении карточки. Ошибка ${err.name} ${err.message}`));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findOne({ _id: cardId })
    .orFail(new NotfoundIdError('Объект с таким ID не найден'))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove({ _id: cardId }).then(() => {
          res.status(deleteSuccessStatus).send({ card });
        }).catch(next);
      } else {
        throw new NotYourCardError('Чужую карту удалять нельзя');
      }
    })
    .catch((err) => {
      if (err.name === castErrorName) {
        return next(new WrongDataError(`Переданы некорректные данные для получении списка карточек. Ошибка ${err.name} ${err.message}`));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
).then((card) => {
  if (card === null) {
    return next(new NotfoundIdError('Объект с таким ID не найден'));
  }
  return res.send(card);
})
  .catch((err) => {
    if (err.name === castErrorName) {
      return next(new WrongDataError(`Переданы некорректные данные при постановке лайка. Ошибка ${err.name} ${err.message}`));
    }
    return next(err);
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
).then((card) => {
  if (card === null) {
    return next(new NotfoundIdError('Объект с таким ID не найден'));
  }
  return res.send(card);
})
  .catch((err) => {
    if (err.name === castErrorName) {
      return next(new WrongDataError(`Переданы некорректные данные при отмене лайка. Ошибка ${err.name} ${err.message}`));
    }
    return next(err);
  });
