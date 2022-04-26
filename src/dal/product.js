const { Cart, Product } = require('../database/models');
const {Op} = require('sequelize');

const productDal = {
  createProduct: async (data, transaction) => {
    if (transaction) {
      return await Product.bulkCreate(data, { transaction });
    }

    return await Product.bulkCreate(data);
  },

  getProductById: async (id) => {
    return await Product.findOne({
      where: { id },
    });
  },

  getProductByField: async (field) => {
    return await Product.findAll({
      where: field
    });
  },

  getProductsByArrayOfIds: async (arrayOfIds) => {
    return await Product.findAll({
      where: {
        id: {[Op.in]: arrayOfIds}
      }
    });
  },

  getAllProducts: async () => {
    return await Product.findAll();
  },

  updateAProductById: async (data) => {
    const id = data.id;
    delete data.id;

    return await Product.update(data, {where: { id}, returning: true, plain: true});
  },

  deleteProductById: async (id) => {
    return await Product.destroy({ where: { id }});
  }
};

module.exports = {productDal};