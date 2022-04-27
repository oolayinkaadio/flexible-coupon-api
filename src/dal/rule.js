const { Rule } = require('../database/models');
const { Op } = require('sequelize');

const ruleDal = {
  createRule: async (data) => {
    return await Rule.create(data);
  },

  getRuleById: async (id) => {
    return await Rule.findOne(id);
  },

  getRulesByArrayOfIds: async (arrayOfIds, transaction) => {
    return await Rule.findAll({
      where: {
        id: {
          [Op.in]: arrayOfIds
        }
      }
    },
    {transaction});
  },

  getAllRules: async () => {
    return await Rule.findAll({});
  },

  getRuleByField: async (field = {}) => {
    return await Rule.findAll({ where: field });
  },

  updateRule: async (data = {}) => {
    const { id } = data;
    delete data.id;

    return await Rule.update(data, { where: id, returning: true, plain: true });
  },

  deleteARuleById: async (id) => {
    return await Rule.destroy({ where: { id } });
  },

  deleteRuleByField: async (field = {}) => {
    return await Rule.delete({ where: { field } });
  }
};

module.exports = { ruleDal };