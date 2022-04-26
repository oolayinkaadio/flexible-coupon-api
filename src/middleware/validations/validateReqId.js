const Joi  = require('joi');
const { errorResponse, messages, statusCodes } = require('../../utils');

const validateReqParamsId = async (req, res, next)=> {
  if (!req.params.id) {
    errorResponse(res, statusCodes.badRequest, messages.validationError);
    return;
  }
  const id = req.params.id;

  const schema = Joi.object().keys({
    id: Joi.string().required().guid({ version: ['uuidv4', 'uuidv5'] })
  });

  const validation = schema.validate({id});

  if (validation.error) {
    return errorResponse(res, statusCodes.badRequest, validation.error.details[0].message);
  };

  return next();
};

module.exports = validateReqParamsId;