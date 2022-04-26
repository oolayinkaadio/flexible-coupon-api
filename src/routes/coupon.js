const { couponController } = require( '../controllers');

const { 
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCouponById
} = couponController;
const couponValidator = require('../middleware/validations/coupon');
 

const validateReqParamsId = require('../middleware/validations/validateReqId');

const express = require('express');

const couponRouter = express.Router();

couponRouter.post('/create', couponValidator.validateCreateCoupon, createCoupon);
couponRouter.get('/:id', validateReqParamsId, couponValidator.validateUpdateCoupon, getCouponById);
couponRouter.get('/all', getAllCoupons);
couponRouter.patch('/update/:id', validateReqParamsId, updateCoupon);
couponRouter.delete('/delete/:id', validateReqParamsId, deleteCouponById);

module.exports = { couponRouter };