const { Discount } = require('../database/models');
const { Op } = require('sequelize');

const discountDal = {
  createDiscount: async (data) => {
    return await Discount.create(data);
  },

  getDiscountById: async (id) => {
    return await Discount.findOne({where: {id}});
  },

  getAllDiscount: async () => {
    return await Discount.findAll();
  },

  getDiscountsByArrayOfIds: async (arrayOfIds, transaction) => {
    return await Discount.findAll({
      where: {
        id: {
          [Op.in]: arrayOfIds
        }
      }
    },
    {transaction});
  },


  getDiscountByField: async (field = {}) => {
    return await Discount.findAll({ where: field });
  },

  updateDiscount: async (data = {}) => {
    const { id } = data;
    delete data.id;

    return await Discount.update(data, { where: {id}, returning: true, plain: true });
  },

  deleteADiscountById: async (id) => {
    return await Discount.destroy({ where: { id } });
  },

  deleteDiscountByField: async (field = {}) => {
    return await Discount.destroy({ where: { field } });
  }
};

module.exports = { discountDal };