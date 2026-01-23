
const express = require('express')
const fs = require('fs')
const path = require('path')
var cors = require('cors')

const apiRouter = require('./routes/api.js')

const PORT = 3009
const app = express()

//код обработчиков

// app.use(cors())  на все запросы

app.use('/api', cors(), apiRouter)


app.listen(PORT, ()=>{
    console.log('Сервер запущен на порту ' + PORT)
})


