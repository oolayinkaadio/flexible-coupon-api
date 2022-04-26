const Joi  = require('joi');
const { errorResponse, messages, statusCodes } = require('../../utils');

const discountValidator = {
  validateCreateDiscount: async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return errorResponse(res, statusCodes.badRequest, messages.validationError);
    }

    const payload = req.body;

    const schema = Joi.object().keys({
      name: Joi.string().max(100).required(),
      value: Joi.number().required(),
      type: Joi.string().valid('fixed_amount', 'percentage', 'both').required(),
    });

    const validation = schema.validate(payload);

    if (validation.error) {
      return errorResponse(res, statusCodes.badRequest, validation.error.details[0].message);
    };

    return next();
  },

  validateUpdateDiscount: async (req, res, next) => {
    const id = req.params.id;
    if (Object.keys(req.body).length === 0) {
      return errorResponse(res, statusCodes.badRequest, messages.validationError);
    }

    const payload = req.body;

    const schema = Joi.object().keys({
      name: Joi.string().max(100),
      value: Joi.number(),
      type: Joi.string().valid('fixed_amount', 'percentage', 'both'),
    });

    const validation = schema.validate(payload);

    if (validation.error) {
      return errorResponse(res, statusCodes.badRequest, validation.error.details[0].message);
    };

    payload['id'] = id;
    req.body = payload;
    
    return next();
  },
};

module.exports =  discountValidator;