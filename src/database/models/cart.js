'use strict';

const { Model, UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */

    static associate(models) {
      this.belongsToMany(models.Product, {
        foreignKey: 'cart_id',
        as: 'products',
        through: 'CartProduct'
      });
     }
  }

  Cart.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    serial_number: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Cart',
    freezeTableName: true
  });

  return Cart;
};