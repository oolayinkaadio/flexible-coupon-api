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
      const {cartId} = req.body;
      return await cartService.getCartAndItsProductsTotalPrice(cartId, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, messages.serverError);
    }
  }
};

module.exports = {cartController};