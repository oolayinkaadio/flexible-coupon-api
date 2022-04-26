module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Rule', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        rule: 'cart total price must be greater than 50 with at least 1 items',
        minimum_cart_length: 1,
        minimum_cart_price: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        rule: 'cart total price must be greater than 100 with at least 2 items',
        minimum_cart_length: 2,
        minimum_cart_price: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        rule: 'cart total price must be greater than 200 with at least 3 items',
        minimum_cart_length: 3,
        minimum_cart_price: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        rule: 'cart total price must be greater than 1000',
        minimum_cart_length: null,
        minimum_cart_price:1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rule', null, {});
  },
};
