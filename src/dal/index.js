const { couponDal } =require('./coupon');
const { couponRuleDal } =require('./coupon_rule');
const { couponDiscountDal } =require('./coupon_discount');
const { discountDal } =require('./discount');
const { ruleDal } = require('./rule');
const { cartDal } = require('./cart');
const { productDal } = require('./product');
const { cartProductDal } = require('./cart_product');
const db = require('../database/models/index');

module.exports = {
  couponDal,
  couponRuleDal,
  couponDiscountDal,
  ruleDal,
  discountDal,
  cartDal,
  productDal,
  cartProductDal,
  db
};
