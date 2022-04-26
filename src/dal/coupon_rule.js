const { CouponRule } = require('../database/models');

const couponRuleDal = {
  createCouponRule: async (data, transaction) => {
    return await CouponRule.bulkCreate(data, {transaction});
  },

  getCouponRuleById: async (id) => {
    return await CouponRule.findOne({ where: { id } });
  },

  getCouponRuleByField: async (field = {}) => {
    return await CouponRule.findAll({ where: field });
  },

  updateCouponRule: async (data = {}) => {
    const { id } = data;
    delete data.id;

    return await CouponRule.update(data, { where: id, returning: true, plain: true });
  },

  deleteACouponRuleById: async (id) => {
    return await CouponRule.destroy({ where: { id } });
  },

  deleteCouponRuleByField: async (field = {}) => {
    return await CouponRule.delete({ where: { field } });
  }
};

module.exports = {couponRuleDal};