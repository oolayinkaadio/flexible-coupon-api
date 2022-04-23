'use strict';

import { Model, UUIDV4 } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class CouponRule extends Model {
    /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */

    static associate(models) {
      this.hasMany(models.Coupon, {
        foreignKey: 'course_id',
        as: 'coupon'
      });

      this.hasMany(models.Rule, {
        foreignKey: 'rule_id',
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
    coupon_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    rule_id: {
      type: DataTypes.UUID,
      allowNull: false,
    }   
  }, {
    sequelize,
    paranoid: true,
    modelName: 'CouponRule',
    freezeTableName: true
  });

  return Course;
};