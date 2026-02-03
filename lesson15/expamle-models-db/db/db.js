const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'db-express',
  'postgres',
  '1234',
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

module.exports = sequelize;
