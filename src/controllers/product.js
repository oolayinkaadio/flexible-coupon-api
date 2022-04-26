const { productService } = require('../services');
const {
  errorResponse, statusCodes, messages
} = require('../utils');

const productController = {
  createProduct: async (req, res) => {
    try {
      const data = req.body;
      return await productService.createProduct(data, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, messages.serverError);
    }
  },

  getAllProducts: async (req, res) => {
    try {
      return await productService.getAllProducts(res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, messages.serverError);
    }
  },

  getAProductById: async (req, res) => {
    try {
      const {id} = req.params;
      return await productService.getProductById(id, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, messages.server);
    }
  }
};

module.exports = { productController };