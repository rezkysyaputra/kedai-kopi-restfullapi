import Joi from 'joi';

const listProductValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
});
const getProductValidation = Joi.number().positive().required();

export { getProductValidation, listProductValidation };
