const express = require('express')
const productController = require('./../controllers/product.controller.js')
const userController = require('./../controllers/user.controller.js')
const router = express.Router()

router.post('/login', userController.login)

router.get('/categires', productController.getCategiries)

router.get('/products', productController.getProducts)

router.get('/product/:id', productController.getProductById)

module.exports = router



