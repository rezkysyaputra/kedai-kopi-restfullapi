import Joi from 'joi';

const listProductValidation = Joi.object({
  page: Joi.number().positive().default(1),
  size: Joi.number().positive().max(100).default(10),
});
const getProductValidation = Joi.number().positive().required();

const searchProductValidation = Joi.object({
  page: Joi.number().positive().default(1),
  size: Joi.number().positive().max(100).default(10),
  name: Joi.string().required(),
});

export { getProductValidation, listProductValidation, searchProductValidation };
