
const express = require('express')
const fs = require('fs')
const path = require('path')
var cors = require('cors')

const apiRouter = require('./routes/api.js')

const PORT = 3009
const app = express()

//код обработчиков

function userIdentify (req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    // console.log("token", authHeader)
}

// app.use(cors())  на все запросы

app.use(express.json())

//тут мы определим пользователя
// app.use(cors(), userIdentify)

//определим его роль


app.use('/api', cors(), apiRouter)
// app.use('/api/admin', userIdentify, apiADMINRouter)


app.listen(PORT, ()=>{
    console.log('Сервер запущен на порту ' + PORT)
})


