const express = require('express')
const productController = require('./../controllers/product.controller.js')
const router = express.Router()

router.get('/categires', productController.getCategiries)

router.get('/products', productController.getProducts)

router.get('/product/:id', productController.getProductById)

module.exports = router



