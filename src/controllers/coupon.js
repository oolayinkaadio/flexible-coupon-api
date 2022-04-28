const { couponService } = require('../services');
const {
  errorResponse, statusCodes
} = require('../utils');
const {
  createCoupon,
  getAllCoupon,
  getCouponById,
  updateCoupon,
  deleteCouponById,
  getCouponByField,
} = couponService;

const couponController = {
  createCoupon: async (req, res) => {
    try {
      const payload = req.body;
      
      return await createCoupon(payload, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
   },
  
  getAllCoupons: async (req, res) => {
    try {
      return await getAllCoupon(res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
   },

  getCouponById: async (req, res) => {
    try {
      const { id } = req.params;
      return await getCouponById(id, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
  },

  getCouponByCode: async (req, res) => {
    try {
      const { code } = req.params;
      return await getCouponByField({code}, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
  },
  
  updateCoupon: async (req, res) => {
    try {
      const payload = req.body;
      return await updateCoupon(payload, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
  },
  
  deleteCouponById: async (req, res) => {
    try {
      const {id} = req.params;
      return await deleteCouponById(id, res);
    } catch (error) {
      return errorResponse(res, statusCodes.serverError, error.message);
    }
  },  
};

module.exports = {couponController};