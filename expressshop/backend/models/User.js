const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primarykey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: false,
            defaultValue: 'user'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true 
        },
        password: {
            type: DataTypes.STRING,
        },
        jwt_token: {
            type: DataTypes.TEXT,
            allowNull: true,
        }, 
    },
    {
        tableName: 'users',
        timestamps: false
    }
)

module.exports = User