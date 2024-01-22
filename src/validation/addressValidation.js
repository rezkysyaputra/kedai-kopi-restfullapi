import Joi from 'joi';

const createAddressValidation = Joi.object({
  name: Joi.string().max(100).required(),
  phone: Joi.string().max(50).required(),
  street: Joi.string().max(255).required(),
  city: Joi.string().max(100).required(),
  province: Joi.string().max(100).required(),
  country: Joi.string().max(100).required(),
  postalCode: Joi.string().max(10).required(),
});

const updateAddressValidation = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().max(100).optional(),
  phone: Joi.string().max(50).optional(),
  street: Joi.string().max(255).optional(),
  city: Joi.string().max(100).optional(),
  province: Joi.string().max(100).optional(),
  country: Joi.string().max(100).optional(),
  postalCode: Joi.string().max(10).optional(),
});

const getAddressValidation = Joi.number().positive().required();

export {
  createAddressValidation,
  updateAddressValidation,
  getAddressValidation,
};
