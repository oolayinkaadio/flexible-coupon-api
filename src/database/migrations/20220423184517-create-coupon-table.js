'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Coupon', { 
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
      code: {
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true
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
    await queryInterface.dropTable('Coupon');
  }
};
