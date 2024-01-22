import Joi from 'joi';

const createOrderValidation = Joi.number().positive().required();

const updateOrderValidation = Joi.object({
  orderId: Joi.number().positive().required(),
  status: Joi.string().optional(),
  addressId: Joi.number().positive().optional(),
});

const getOrderValidation = Joi.number().positive().required();

export { createOrderValidation, updateOrderValidation, getOrderValidation };
