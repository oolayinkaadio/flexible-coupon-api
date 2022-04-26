'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Rule', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      serial_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      rule: {
        type: Sequelize.STRING,
        allowNull: false
      },
      minimum_cart_length: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      minimum_cart_price: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      deletedAt: {
        type: Sequelize.DATE
      }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Rule');
  }
};
