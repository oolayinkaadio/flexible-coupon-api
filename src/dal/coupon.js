const { Coupon, CouponRule, CouponDiscount, Rule, Discount } = require('../database/models');

const couponDal = {
  createCoupon: async (data, transaction) => {
    return await Coupon.create(data, {transaction});
  },

  getCouponById: async (id) => {
    return await Coupon.findOne(id);
  },

  getCouponWithItsRulesAndDiscount: async (coupon_id) => {
    return await Coupon.findOne({
      where: { id: coupon_id },
      attributes: ['id'],
      include: [
        {
          model: Rule,
          as: 'rules',
        },
        {
          model: Discount,
          as: 'discounts',
        }
      ]
    });
  },

  getCouponByField: async (field = {}) => {
    return await Coupon.findOne({
      where: field,
      attributes: ['id'],
      include: [
        {
          model: Rule,
          as: 'rules',
          through: {attributes: []}
        },
        {
          model: Discount,
          as: 'discounts',
          through: {attributes: []}
        }
      ]
    });
  },

  getAllCoupons: async () => {
    return await Coupon.findAll();
  },

  updateCoupon: async (data = {}) => {
    const { id } = data;
    delete data.id;

    return await Coupon.update(data, { where: id, returning: true, plain: true });
  },

  deleteACouponById: async (id) => {
    return await Coupon.destroy({ where: { id } });
  },

  deleteCouponByField: async (field = {}) => {
    return await Coupon.delete({ where: { field } });
  }
};

module.exports = { couponDal };