'use strict';
const { Model, UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */

    static associate(models) {
      this.belongsToMany(models.Rule, {
        foreignKey: 'coupon_id',
        as: 'rules',
        through: 'CouponRule'
      });

      this.belongsToMany(models.Discount, {
        foreignKey: 'coupon_id',
        as: 'discounts',
        through: 'CouponDiscount'
      });
    }
  }

  Coupon.init({
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
    coupon_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Coupon',
    freezeTableName: true
  });

  return Coupon;
};