const express = require('express')
const productController = require('./../controllers/product.controller.js')
const userController = require('./../controllers/user.controller.js')
const router = express.Router()

// пользователь
router.post('/users/register', userController.register)
router.post('/users/login', userController.login)
router.post('/users/logout', userController.logout)
router.get('/users/:id', userController.getUser)
router.patch('/users/:id', userController.patchUser)

// товары
router.get('/products', productController.getProducts)
router.get('/product/:id', productController.getProductById)

// Категории
router.get('/categires', productController.getCategories)

//Получение товаров из категории по ID
router.get('/categires/:categoryId', productController.getProductsByCategory)

// Заказы
router.get('/orders', orderController.getOrders)
router.post('/orders', orderController.createOrder)


module.exports = router



