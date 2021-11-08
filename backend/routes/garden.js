const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// экспортируем его
module.exports = router;

const {
  postBed, getBed, deleteBed, postNote, getNote, deleteNote,
} = require('../controllers/garden');

router.post('/garden/bed', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
}), postBed);

router.get('/garden/bed', getBed);

router.delete('/garden/bed/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), deleteBed);

router.post('/garden/note', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
}), postNote);

router.get('/garden/note', getNote);

router.delete('/garden/note/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), deleteNote);
