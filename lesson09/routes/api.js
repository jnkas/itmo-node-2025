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

    sendMailToAdmin(data)

    comments.push(data)
    res.status(200).end()
})

router.get('/comment/:index', (req, res)=>{
    let index = req.params.index
    let comment = comments[index]

    if(comment) {
        res.status(200)
        res.set('Content-Type', 'text/html')
        res.send(`
            <h1>Детали о комментарии №${index}</h1>
            <p>Автор: ${comment.name}</p>
            <p>Автор: ${comment.message}</p>
            <p>Автор: ${comment.date}</p>
            <a href="/">На главную</a>
        `)

    }

})

module.exports = router