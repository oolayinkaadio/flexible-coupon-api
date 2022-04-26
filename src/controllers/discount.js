const {
  errorResponse, statusCodes
} = require('../utils');

const { discountService } = require('../services');
const {
  createDiscount,
  getAllDiscount,
  getDiscountById,
  updateDiscount,
  deleteDiscountById
} = discountService;

const discountController = {
  createDiscount: async (req, res) => { 
    try {
      const payload = req.body;
      return await createDiscount(payload, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
  },
  
  getAllDiscount: async (req, res) => { 
    try {
      return await getAllDiscount(res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
  },

  getDiscountById: async (req, res) => {
    try {
      const { id } = req.params;
      return await getDiscountById(id, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
   },
  
  updateDiscount: async (req, res) => {
    try {
      const payload = req.body;
      return await updateDiscount(payload, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
   },
  
  deleteDiscountById: async (req, res) => { 
    try {
      const { id } = req.params;
      return deleteDiscountById(id, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
  }  
};

module.exports = {discountController};