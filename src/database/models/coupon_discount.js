'use strict';

const { Model, UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CouponDiscount extends Model {
    /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */

    static associate(models) {
      this.hasMany(models.Coupon, {
        foreignKey: 'id',
        as: 'discount'
      });

      this.hasMany(models.Discount, {
        foreignKey: 'id',
        as: 'coupon_discount'
      });
    }
  }
  
  CouponDiscount.init({
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
    coupon_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    discount_id: {
      type: DataTypes.UUID,
      allowNull: false,
    }   
  }, {
    sequelize,
    paranoid: true,
    modelName: 'CouponDiscount',
    freezeTableName: true
  });

  return CouponDiscount;
}; 