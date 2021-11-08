const Purchase = require('../models/purchase');

const DataError = require('../errors/dataError');
const NotFoundError = require('../errors/notFoundError');

module.exports.getPurchases = (req, res, next) => {
  Purchase.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.postCard = (req, res, next) => {
  // console.log('post');
  Purchase.create(req.body)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || (err.name === 'ValidationError')) {
        next(new DataError('Неправильные данные'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Purchase.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      Purchase.deleteOne(card)
        .then(() => res.send({ data: card }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Неправильные данные'));
      }
      return next(err);
    });
};
