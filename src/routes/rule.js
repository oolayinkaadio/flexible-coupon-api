const { ruleController } = require('../controllers');

const { 
  createRule,
  getAllRules,
  getRuleById,
  updateRule,
  deleteRuleById
 } = ruleController;

const express = require('express');

const {

} = ruleController;

const ruleRouter = express.Router();

ruleRouter.post('/create', createRule);
ruleRouter.get('/:id', getRuleById);
ruleRouter.get('/all', getAllRules);
ruleRouter.patch('/update/:id', updateRule);
ruleRouter.delete('/delete/:id', deleteRuleById);

module.exports = { ruleRouter };