'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Currency.belongsTo(models.User, {foreignKey: 'UserId', targetKey: 'id'})
    }
  }
  Currency.init({
    balance: DataTypes.INTEGER,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Currency is unauthenticated`
        },
        notNull: {
          msg: `Currency is unauthenticated`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Currency',
  });
  return Currency;
};