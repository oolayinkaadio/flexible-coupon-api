const {CartProduct, Product, Cart} = require('../database/models');

const cartProductDal = {
  createCartProductRecord: async (data, transaction) => {
    if (transaction) {
      return await CartProduct.bulkCreate(data, { transaction });
    }

    return await CartProduct.bulkCreate(data);
  },

  getCartProductById: async (id) => {
    return await CartProduct.findOne({
      where: { id },
      include: [
        {
        model: Product,
        as: 'products'
        },
        {
          model: Cart,
          as: 'carts',
        }
      ]
    });
  },

  getCartProductByField: async (field={}) => {
    return await CartProduct.findAll({
      where: field,
      include: [
        {
        model: Product,
        as: 'products'
        },
        {
          model: Cart,
          as: 'carts',
        }
      ]
    });
  },

  deleteCartProductById: async (id) => {
    return await CartProduct.destroy({ where: { id }});
  }
};

module.exports = { cartProductDal };