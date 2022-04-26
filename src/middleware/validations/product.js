const Joi  = require('joi');
const { errorResponse, messages, statusCodes } = require('../../utils');

const productValidator = {
  validateCreateProduct: async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return errorResponse(res, statusCodes.badRequest, messages.validationError);
    }

    const payload = req.body;

    if (Array.isArray(payload)) {
      const schema = Joi.object().keys({
        name: Joi.string().max(100).required(),
        price: Joi.number().precision(2).required(),
      });
      for (let i = 0; i < payload.length; i++) {
        const currPayload = payload[i];
        const validation = schema.validate(currPayload);
  
        if (validation.error) {
          return errorResponse(res, statusCodes.badRequest, validation.error.details[0].message);
        };
      };
     
  
      return next();
    }
    return errorResponse(res, statusCodes.badRequest, messages.validationError);
  },

};

module.exports = productValidator;