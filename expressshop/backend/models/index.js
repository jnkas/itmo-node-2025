const sequelize = require('../config/db')
const User = require('./User')
const Product = require('./Product')
const Category = require('./Category')
const Order = require('./Order')

// Связи в таблицах
Category.hasMany(Product, { foreignKey: 'category_id' })
Category.belongsTo(Category, { foreignKey: 'id_parent_category', as: 'parent' })
Product.belongsTo(Category, { foreignKey: 'category_id' })
User.hasMany(Order, { foreignKey: 'user_id' })
Order.belongsTo(User, { foreignKey: 'user_id' })

module.exports = {
    sequelize,
    User,
    Product,
    Order,
    Category
}
