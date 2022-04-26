const { ruleDal } = require('../dal');
const {
  errorResponse,
  messages,
  statusCodes, successResponse, successResponseWithData
} =require('../utils');

const ruleService = {
  createRule: async (data, res) => {
    try {
      const {rule} = data;

      const ruleExists = await ruleDal.getRuleByField({rule});
      if (ruleExists) {
        return errorResponse(res, statusCodes.notFound, messages.notFound);
      };
      
      const newRule = await ruleDal.createRule(data);
      if (!newRule) {
        return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      };
  
      return successResponseWithData(res, statusCodes.created, messages.created, newrule);

    } catch (error) {
      throw new Error(error);
    }  
  },

  getAllRule: async (res) => {
    try {
      const allRule = await discountDal.getAllRule();
      if (!allRule) {
        return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      }
      return successResponseWithData(res, statusCodes.success, messages.success, allRule);
      
    } catch (error) {
      throw new Error(error);
    }
  },
  
  getRuleById: async (id, res) => {
    try {
      const ruleExists = await ruleDal.getRuleByField({id});
      if (!ruleExists) {
        return errorResponse(res, statusCodes.notFound, messages.notFound);
      };

      return successResponseWithData(res, statusCodes.created, messages.created, ruleExists);
      
    } catch (error) {
      throw new Error(error);
    };
  },

  updateRule: async (data, res) => {
    try {
      const { id } = data;
      const ruleExists = await ruleDal.getRuleByField({id});
      if (!ruleExists) {
        return errorResponse(res, statusCodes.notFound, messages.notFound);
      };
  
      const updateRule = await ruleDal.updateRule(data);
      if (!updateRule) {
        return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      }
  
      return successResponseWithData(res, statusCodes.success, messages.success, updateRule);
      
    } catch (error) {
      throw new Error(error);
    };  
  },

  deleteRuleById: async (id, res) => {
    try {
      const ruleExists = await ruleDal.getRuleByField({id});
      if (!ruleExists) {
        return errorResponse(res, statusCodes.notFound, messages.notFound);
      };
  
      const deleteRule = await ruleDal.deleteARuleById(id);
      if (!deleteRule) {
        return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      };
  
      return successResponse(res, statusCodes.deleted, messages.deleted);
      
    } catch (error) {
      throw new Error(error);
    };
  }
};

module.exports = { ruleService };