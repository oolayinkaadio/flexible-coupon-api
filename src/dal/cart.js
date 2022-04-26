const {Cart, Product} = require('../database/models');

const cartDal = {
  createCart: async (transaction) => {
    if (transaction) {
      return await Cart.create({ transaction });
    }

    return await Cart.create({ transaction });
  },

  getCartById: async (id) => {
    return await Cart.findOne({
      where: { id },
      include: [{
        model: Product,
        as: 'products'
      }]
    });
  },

  deleteCartById: async (id) => {
    return await Cart.destroy({ where: { id }});
  }
};

module.exports = cartDal;