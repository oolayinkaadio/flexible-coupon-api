const {cartDal, productDal, cartProductDal, db } = require('../dal');

const {
  successResponseWithData, successResponse, errorResponseWithData, errorResponse, generateCouponCode, messages, statusCodes
} = require('../utils');

const productService = {
  createProduct: async (data, res) => {
    try {
      for (let i = 0; i < data.length; i++) {
        const currentProduct = data[i];
        const productExist = await productDal.getProductByField({name: currentProduct.name});
        if (productExist && productExist.length > 0) {
          return errorResponse(res, statusCodes.conflict, messages.conflict);
        }
      }

      const createProduct = await productDal.createProduct(data);
      if(!createProduct) { return errorResponse(res, statusCodes.badRequest, messages.badRequest);}

      return successResponseWithData(res, statusCodes.created, messages.created, createProduct);
    } catch (error) {
      throw new Error(error);
    }
  },

  getProductById: async (id, res) => {
    try {
      const product = await productDal.getProductById(id);
      if(!product) { return errorResponse(res, statusCodes.notFound, messages.notFound); }

      return successResponseWithData(res,statusCodes.success, messages.success, product);

    } catch (error) {
      throw new Error(error);
    }
  },

  getAllProducts: async (res) => {
    try {
      const products = await productDal.getAllProducts();
      if(!products) return errorResponse(res, statusCodes.badRequest, messages.badRequest);
      return successResponseWithData(res, statusCodes.success, messages.success, products);
    } catch (error) {
      throw new Error(error);
    };
  }
};

module.exports = { productService };