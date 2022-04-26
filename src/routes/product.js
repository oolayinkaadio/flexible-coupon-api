const { productController } = require( '../controllers');


const productValidator = require('../middleware/validations/product');

const { validateAddProductToproduct, validateGetproductDiscount } = productValidator;
 

const validateReqParamsId = require('../middleware/validations/validateReqId');

const express = require('express');

const productRouter = express.Router();

productRouter.post('/create', productValidator.validateCreateProduct, productController.createProduct);
productRouter.get('/all', productController.getAllProducts);
productRouter.get('/:id', validateReqParamsId, productController.getAProductById);

module.exports = { productRouter };