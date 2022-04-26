const {
  errorResponse, statusCodes
} =require('../utils');

const { ruleService } =require('../services');
const {
  createRule,
  getAllRule,
  getRuleById,
  updateRule,
  deleteRuleById
} = ruleService;

const ruleController = {
  createRule: async (req, res) => {
    try {
      const payload = req.body;
      return await createRule(payload, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
  },

  getAllRules: async (req, res) => {
    try {
      return await getAllRule(res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
  },

  getRuleById: async (req, res) => {
    try {
      const { id } = req.params;
      return await getRuleById(id, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
   },
  
  updateRule: async (req, res) => {
    try {
      const payload = req.body;
      return await updateRule(payload, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
   },
  
  deleteRuleById: async (req, res) => {
    try {
      const { id } = req.params;
      return await deleteRuleById(id, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
  },
};

module.exports = {ruleController};