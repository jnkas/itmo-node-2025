const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Order = sequelize.define(
    'Order',
    {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        order_status: {
            type: DataTypes.ENUM('Создан', 'В процессе', 'Отправлен'),
            allowNull: false,
            defaultValue: 'Создан'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        product_ids: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false
        },
    },
    {
        tableName: 'orders',
        timestamps: true,
        updatedAt: false
    }
)

module.exports = Order
