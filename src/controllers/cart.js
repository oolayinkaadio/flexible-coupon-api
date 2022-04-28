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
      // const prodCartId = '22be981c-80ff-4868-8672-25ef3b3bfca5';
      const localCartId = '3448f3c8-1597-4f4a-8736-4c25005bcbc9';
      return await cartService.getCartAndItsProductsTotalPrice(localCartId, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, messages.serverError);
    }
  },

};

module.exports = {cartController};