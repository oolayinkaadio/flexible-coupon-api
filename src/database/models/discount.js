'use strict';

const { Model, UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */

    static associate(models) {
      this.hasMany(models.Coupon, {
        foreignKey: 'id',
        as: 'discount',
      });

      this.belongsToMany(models.Coupon, {
        foreignKey: 'discount_id',
        as: 'discounts',
        through: 'CouponDiscount'
      });
    }
  }

  Discount.init({
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: ['percentage', 'fixed_price', 'both'],
      allowNull: false
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Discount',
    freezeTableName: true
  });

  return Discount;
};