const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// экспортируем его
module.exports = router;

const {
  postCard, getPurchases, deleteCard,
} = require('../controllers/purchase');

router.post('/planer', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
}), postCard);

router.get('/planer', getPurchases);

router.delete('/planer/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), deleteCard);
