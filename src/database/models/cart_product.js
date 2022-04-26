'use strict';

const { Model, UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */

    static associate(models) {
      this.hasMany(models.Cart, {
        foreignKey: 'id',
        as: 'carts',
      });

      this.hasMany(models.Product, {
        foreignKey: 'id',
        as: 'products',
      });
    }
  }

  CartProduct.init({
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
    cart_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'CartProduct',
    freezeTableName: true
  });

  return CartProduct;
};