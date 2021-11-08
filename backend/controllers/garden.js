const Bed = require('../models/bed');
const Note = require('../models/note');
const DataError = require('../errors/dataError');
const NotFoundError = require('../errors/notFoundError');

module.exports.getBed = (req, res, next) => {
  Bed.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.postBed = (req, res, next) => {
  // console.log('post');
  Bed.create(req.body)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || (err.name === 'ValidationError')) {
        next(new DataError('Неправильные данные'));
      }
      return next(err);
    });
};

module.exports.deleteBed = (req, res, next) => {
  Bed.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет элемента с таким id');
      }
      Bed.deleteOne(card)
        .then(() => res.send({ data: card }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Неправильные данные'));
      }
      return next(err);
    });
};

module.exports.getNote = (req, res, next) => {
  Note.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.postNote = (req, res, next) => {
  // console.log('post');
  Note.create(req.body)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || (err.name === 'ValidationError')) {
        next(new DataError('Неправильные данные'));
      }
      return next(err);
    });
};

module.exports.deleteNote = (req, res, next) => {
  Note.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет элемента с таким id');
      }
      Note.deleteOne(card)
        .then(() => res.send({ data: card }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Неправильные данные'));
      }
      return next(err);
    });
};
