const dbConnect = require('./../services/db.service')

//управляем запросами в БД

async function getProducts (req, res, next) {
    let data = await dbConnect('db-products')

    data.list({include_docs: true})
    .then(async (docs) => {
        //получили данные
        console.log(docs)

        //преобразовали
        // let catData = await dbConnect('db-category')

        //     // console.log(req.params.id)
        //     // const productId = 'ac743ba0fdb68fc8a1aa8783510048bc'

        //     catData.list({include_docs: true})
        //     .then(doc => {
        //         // console.log(doc)
        //         res.json(doc)

        //         // for который перебирает все категории и по нужному id получает название
        //         console.log(docs.rows[0].doc)
        //         // docs.rows[0].doc.categoryName = 
        //     })

        

        //отправили
        res.json(docs)
    })
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