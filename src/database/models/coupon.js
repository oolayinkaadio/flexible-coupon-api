'use strict';

import { Model, UUIDV4 } from 'sequelize';

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
        as: 'coupon',
        through: 'CouponRule'
      });

      this.belongsTo(models.Discount, {
        foreignKey: 'id',
        as: 'coupon'
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
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Coupon',
    freezeTableName: true
  });

  return Coupon;
};