import Joi from 'joi';

const addCartValidation = Joi.object({
  productId: Joi.number().positive().required(),
  quantity: Joi.number().positive().required(),
});
const updateCartValidation = Joi.object({
  cartItemId: Joi.number().positive().required(),
  quantity: Joi.number().positive().required(),
});

const removeCartValidation = Joi.number().positive().required();

export { addCartValidation, updateCartValidation, removeCartValidation };
