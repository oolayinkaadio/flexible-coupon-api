const Joi  = require('joi');
const { errorResponse, messages, statusCodes } = require('../../utils');

const couponValidator = {
  validateCreateCoupon: async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return errorResponse(res, statusCodes.badRequest, messages.validationError);
    }

    const payload = req.body;

    const schema = Joi.object().keys({
      code: Joi.string().max(100).required(),
      ruleIds: Joi.array().items(Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required()).required(),
      discountIds: Joi.array().items(Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required()).required(),
    });

    const validation = schema.validate(payload);

    if (validation.error) {
      return errorResponse(res, statusCodes.badRequest, validation.error.details[0].message);
    };

    return next();
  },

  validateUpdateCoupon: async (req, res, next) => {
    const id = req.params.id;
    if (Object.keys(req.body).length === 0) {
      return errorResponse(res, statusCodes.badRequest, messages.validationError);
    }

    const payload = req.body;

    const schema = Joi.object().keys({
      name: Joi.string().max(100).required(),
      ruleIds: Joi.array().items(Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required()),
      discountIds: Joi.array().items(Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required()),
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

module.exports =  couponValidator;