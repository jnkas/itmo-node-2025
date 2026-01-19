const express = require('express')

const router = express.Router()


let comments = [
    {
        name: "Иван",
        message: "Интересно!",
        date: "19.02.2026 20:47"
    },
    {
        name: "Анастасия",
        message: "не очень",
        date: "18.02.2026 20:47"
    }
]

router.get('/allcomments', (req, res)=> {
    res.json(comments)
})

router.post('/comment', express.json(), (req, res)=> {
    let data = req.body

    comments.push(data)
    res.status(200).end()
})

module.exports = router