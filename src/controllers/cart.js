const { cartService } = require('../services');
const {
  errorResponse, statusCodes, messages
} = require('../utils');

const cartController = {
  addProductToCart: async (req, res) => {
    try {
      const data = req.body;
      return await cartService.addProductToCart(data, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, messages.serverError);
    }
  },

  getCartDiscount: async (req, res) => {
    try {
      const data = req.body;
      return await cartService.calculateDiscountForCart(data, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, messages.serverError);
    }
  },

  getCartAndItsProductsTotalPrice: async (req, res) => {
    try {
      const prodCartId = 'b6cb626d-a017-4d6b-8e03-6c73c42fc427';
      // const localCartId = '3448f3c8-1597-4f4a-8736-4c25005bcbc9';
      return await cartService.getCartAndItsProductsTotalPrice(prodCartId, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, messages.serverError);
    }
  },

};

module.exports = {cartController};