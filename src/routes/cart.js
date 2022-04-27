const { cartController } = require( '../controllers');

const { 
  addProductToCart,
  getCartDiscount,
  getCartAndItsProductsTotalPrice,
  getCartDiscountProd,
  getCartAndItsProductsTotalPriceProd
} = cartController;
const cartValidator = require('../middleware/validations/cart');

const { validateAddProductToCart, validateGetCartDiscount, validateCartId } = cartValidator;
 

const validateReqParamsId = require('../middleware/validations/validateReqId');

const express = require('express');

const cartRouter = express.Router();

cartRouter.post('/add-to-cart', cartValidator.validateAddProductToCart, addProductToCart);
// cartRouter.post('/coupon', cartValidator.validateGetCartDiscount, getCartDiscount);
// cartRouter.get('/cart', cartValidator.validateCartId, getCartAndItsProductsTotalPrice);
// cartRouter.get('/:id', validateReqParamsId, cartValidator.validateUpdateCart, getCartById);
// cartRouter.get('/all', getAllCarts);
// cartRouter.patch('/update/:id', validateReqParamsId, updateCart);
// cartRouter.delete('/delete/:id', validateReqParamsId, deleteCartById);

cartRouter.get('/coupon', getCartDiscountProd);
cartRouter.get('/cart', getCartAndItsProductsTotalPriceProd);

module.exports = { cartRouter };