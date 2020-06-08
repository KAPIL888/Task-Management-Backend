const Joi = require("@hapi/joi");

const registrationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().min(5).required().email(),
    username: Joi.string().min(5).required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(data);
};

loginValidation = (data) => {
  const login = Joi.object({
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).required(),
  });
  return login.validate(data);
};

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
