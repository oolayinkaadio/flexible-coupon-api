'use strict';

import { Model, UUIDV4 } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Rule extends Model {
    /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */

    static associate(models) {
      this.belongsToMany(models.Rule, {
        foreignKey: 'rule_id',
        as: 'rule',
        through: 'CouponRule'
      });
    }
  }

  Rule.init({
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
    rule: {
      type: DataTypes.STRING,
      allowNull: false
    },
    minimum_cart_length: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    minimum_cart_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Rule',
    freezeTableName: true
  });

  return Rule;
};