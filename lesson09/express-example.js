const express = require('express')
const app = express()
const PORT = 3009

const requestHandler = (req, res, next) => {
    console.log('Запрос. Тип запроса:' + req.method + ' ' + req.url)
    next()
}

const apiRouter = require('./routes/api.js')

app.use('/api', apiRouter)

app.use(express.static('public'))


app.use((req, res, next)=> {
    res.send(`
        <h1>404 - Страница не найдена</h1>    
    `)
})



app.listen(PORT, ()=>{
    console.log('Сервер запущен на порту ' + PORT)
})

