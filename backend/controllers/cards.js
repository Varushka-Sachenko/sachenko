const Card = require('../models/card');

const DataError = require('../errors/dataError');
const NotFoundError = require('../errors/notFoundError');
const AccessError = require('../errors/accessError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => card)
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Неправильный id'));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Неправильный id'));
      }
      return next(err);
    });
};

module.exports.postCard = (req, res, next) => {
  req.body.owner = req.user;
  Card.create(req.body)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || (err.name === 'ValidationError')) {
        next(new DataError('Неправильные данные'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      if (card.owner.equals(req.user._id)) {
        Card.deleteOne(card)
          .then(() => res.send({ data: card }));
      } else { throw new AccessError('Нельзя удалять чужие карточки'); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Неправильные данные'));
      }
      return next(err);
    });
};
