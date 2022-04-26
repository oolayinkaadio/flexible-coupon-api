const { CouponDiscount } = require('../database/models');

const couponDiscountDal = {
  createCouponDiscount: async (data, transaction) => {
    return await CouponDiscount.bulkCreate(data, {transaction});
  },

  getCouponDiscountById: async (id) => {
    return await CouponDiscount.findOne({ where: { id } });
  },

  getCouponDiscountByField: async (field = {}) => {
    return await CouponDiscount.findAll({ where: field });
  },

  updateCouponDiscount: async (data = {}) => {
    const { id } = data;
    delete data.id;

    return await CouponDiscount.update(data, { where: id, returning: true, plain: true });
  },

  deleteACouponDiscountById: async (id) => {
    return await CouponDiscount.destroy({ where: { id } });
  },

  deleteCouponDiscountByField: async (field = {}) => {
    return await CouponDiscount.delete({ where: { field } });
  }
};

module.exports = {couponDiscountDal};