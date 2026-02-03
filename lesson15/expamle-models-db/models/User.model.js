const { DataTypes } = require('sequelize');
const sequelize = require('./../db/db.js');

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  login: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  passw: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  id_role: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
