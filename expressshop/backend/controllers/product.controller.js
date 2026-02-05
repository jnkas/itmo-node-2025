const {Product} = require('../models')

//управляем запросами в БД

async function getProducts (req, res, next) {
    
    const products = await Product.findAll({
        order: [["id", "ASC"]]
    })
    res.json(products)

}

async function getProductById (req, res, next) {
    //тут будет логика
    let data = await dbConnect('db-products')

    // console.log(req.params.id)
    // const productId = 'ac743ba0fdb68fc8a1aa8783510048bc'

    data.get(req.params.id)
    .then(doc => {
        // console.log(doc)
        res.json(doc)
    })
}

async function getCategiries (req, res, next) {

    let data = await dbConnect('db-category')

    data.list({include_docs: true})
    .then(doc => {
        // console.log(doc)
        res.json(doc)
    })

}

function getCategoryById (req, res, next) {
    
}

module.exports = {
    getProducts,
    getProductById,
    getCategiries,
    getCategoryById
}