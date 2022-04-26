const { discountController }= require('../controllers');

const { 
  createDiscount,
  getAllDiscount,
  getDiscountById,
  updateDiscount,
  deleteDiscountById
} = discountController;
 
const discountValidator = require('../middleware/validations/discount');
const {validateCreateDiscount, validateUpdateDiscount} = discountValidator;
const validateReqParamsId = require('../middleware/validations/validateReqId');

const express = require('express');

const discountRouter = express.Router();

discountRouter.post('/create',validateCreateDiscount, createDiscount);
discountRouter.get('/all', getAllDiscount);
discountRouter.get('/:id', validateReqParamsId, getDiscountById);
discountRouter.patch('/update/:id',validateReqParamsId, validateUpdateDiscount, updateDiscount);
discountRouter.delete('/delete/:id', validateReqParamsId, deleteDiscountById);

module.exports = { discountRouter };