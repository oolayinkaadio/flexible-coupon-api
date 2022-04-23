'use strict';

import { Model, UUIDV4 } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */

    static associate(models) {
      this.hasMany(models.Discount, {
        foreignKey: 'id',
        as: 'discount',
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
      value: ['percentage', 'fixed_price', 'both'],
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