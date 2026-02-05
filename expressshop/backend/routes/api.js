const express = require('express')
const productController = require('../controllers/product.controller.js')
const userController = require('../controllers/user.controller.js')
const orderController = require('../controllers/order.controller.js')
const router = express.Router()

// пользователь
router.post('/users/register', userController.register)
router.post('/users/login', userController.login)
router.post('/users/logout', userController.logout)
router.get('/users/:id', userController.getUser)
router.patch('/users/:id', userController.patchUser)

// получение товаров
router.get('/products', productController.getProducts)
router.get('/product/:id', productController.getProductById)

// получение категорий
router.get('/categories', productController.getCategories)
router.get('/categories/:categoryId', productController.getProductsByCategory)

// работа с заказами у пользователя
router.get('/orders', orderController.getOrders)
router.post('/orders', orderController.createOrder)


module.exports = router
