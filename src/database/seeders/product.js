module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Product', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'Hollandia',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'Peak Milk',
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'Goat Meat',
        price: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'Rice',
        price: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Product', null, {});
  },
};
