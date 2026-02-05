const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Category = sequelize.define(
    'Category',
    {
      id_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      id_parent_category: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    },
    {
      tableName: 'categories',
      timestamps: false
    }
  )


module.exports = Category