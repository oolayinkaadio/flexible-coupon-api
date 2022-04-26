module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Discount', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'fixed amount off the total price',
        type: 'fixed_price',
        value: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'Percent-off total price',
        type: 'percentage',
        value: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'Percent-off / fixed amount (use greatest value)',
        type: 'both',
        value: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Discount', null, {});
  },
};
