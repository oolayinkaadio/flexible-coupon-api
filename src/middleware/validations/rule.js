const Joi = require('joi');
const { errorResponse, messages, statusCodes } = require('../../utils');

const ruleValidator = {
  validateCreateRule: async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return errorResponse(res, statusCodes.badRequest, messages.validationError);
    }

    const payload = req.body;
    const schema = Joi.object().keys({
      rule: Joi.string().max(100).required(),
      minimum_cart_length: Joi.number().required(),
      minimum_cart_price: Joi.number().precision(2).required(),
    });

    const validation = schema.validate(payload);

    if (validation.error) {
      return errorResponse(res, statusCodes.badRequest, validation.error.details[0].message);
    };

    return next();
  }
};

module.exports = ruleValidator;;