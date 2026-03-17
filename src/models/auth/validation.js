const Joi = require('joi');

exports.signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('FARMER', 'BUSINESSMAN').required(),

  name: Joi.string().optional(),
  businessName: Joi.string().optional(),
  contactName: Joi.string().optional(),

  phone: Joi.string().required(),
  address: Joi.string().required()
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});