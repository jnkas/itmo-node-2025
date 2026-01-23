const express = require('express')

const router = express.Router()

const productDataFromDB = [
    {
        "name": "Товар 1",
        "price": "99999",
        "raiting": "4.9"
    },
    {
        "name": "Товар 2",
        "price": "77777",
        "raiting": "4.9"
    },
    {
        "name": "Товар 3",
        "price": "66777",
        "raiting": "3.3"
    },
    {
        "name": "Товар 4",
        "price": "55777",
        "raiting": "2.9"
    },
    {
        "name": "Товар 5",
        "price": "55777",
        "raiting": "2.9"
    }
]

router.get('/products', (req, res)=>{
    res.json(productDataFromDB)
})

router.get('/product/:id', (req, res)=>{
    //тут будет логика
    res.json(productDataFromDB)
})

module.exports = router



