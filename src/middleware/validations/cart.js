const Joi  = require('joi');
const { errorResponse, messages, statusCodes } = require('../../utils');

const cartValidator = {
  validateAddProductToCart: async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return errorResponse(res, statusCodes.badRequest, messages.validationError);
    }

    const payload = req.body;

    const schema = Joi.object().keys({
      productIds: Joi.array().items(Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required()).required(),
    });

    const validation = schema.validate(payload);

    if (validation.error) {
      return errorResponse(res, statusCodes.badRequest, validation.error.details[0].message);
    };

    return next();
  },

  validateGetCartDiscount: async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return errorResponse(res, statusCodes.badRequest, messages.validationError);
    }

    const payload = req.body;

    const schema = Joi.object().keys({
      coupon_code: Joi.string().max(1).required(),
      cart_id: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required(),
    });

    const validation = schema.validate(payload);

    if (validation.error) {
      return errorResponse(res, statusCodes.badRequest, validation.error.details[0].message);
    };

    req.body = payload;
    
    return next();
  },

  validateCartId: async (req, res, next) =>{
    if (Object.keys(req.body).length === 0) {
      return errorResponse(res, statusCodes.badRequest, messages.validationError);
    }

    const payload = req.body;

    const schema = Joi.object().keys({
      cartId: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required(),
    });

    const validation = schema.validate(payload);

    if (validation.error) {
      return errorResponse(res, statusCodes.badRequest, validation.error.details[0].message);
    };

    return next();
  }
};

module.exports = cartValidator;