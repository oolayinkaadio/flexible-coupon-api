const { ruleController } = require('../controllers');

const { 
  createRule,
  getAllRules,
  getRuleById,
  updateRule,
  deleteRuleById
 } = ruleController;

const express = require('express');

const ruleValidator = require('../middleware/validations/rule');
const validateReqParamsId = require('../middleware/validations/validateReqId');

const {validateCreateRule} = ruleValidator;

const ruleRouter = express.Router();

ruleRouter.post('/create', validateCreateRule, createRule);
ruleRouter.get('/all', getAllRules);
ruleRouter.get('/:id',validateReqParamsId, getRuleById);
ruleRouter.patch('/update/:id',validateReqParamsId, updateRule);
ruleRouter.delete('/delete/:id',validateReqParamsId, deleteRuleById);

module.exports = { ruleRouter };