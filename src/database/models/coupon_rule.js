'use strict';

const { Model, UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CouponRule extends Model {
    /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */

    static associate(models) {
      this.hasMany(models.Coupon, {
        foreignKey: 'id',
        as: 'coupon'
      });

      this.hasMany(models.Rule, {
        foreignKey: 'id',
        as: 'rule'
      });
    }
  }
  
  CouponRule.init({
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
    modelName: 'CouponRule',
    freezeTableName: true
  });

  return CouponRule;
}; 