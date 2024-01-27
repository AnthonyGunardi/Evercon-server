'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Currency, {foreignKey: 'UserId', sourceKey: 'id'})
      User.hasMany(models.Activity, {foreignKey: 'UserId', sourceKey: 'id'})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: `Username is Required`
        },
        notNull: {
          msg: `Username is Required`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Password is Required`
        },
        notNull: {
          msg: `Password is Required`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'participant'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};