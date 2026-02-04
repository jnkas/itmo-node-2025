
const express = require('express')
const fs = require('fs')
const path = require('path')
var cors = require('cors')

const { userIdentify } = require('./middleware/auth') 

const apiRouter = require('./routes/api.js')
const { sequelize } = require('./models')

const PORT = 3009
const app = express()

// Парсинг всех JSON из POST запросов
app.use(express.json())

//тут мы определим пользователя
app.use(userIdentify)
app.use('/api', cors(), apiRouter)
// app.use('/api/admin', adminOnly, apiADMINRouter)

async function start() {
    try {
        await sequelize.authenticate()
        console.log('Подключение к БД успешно')
        await sequelize.sync()
        console.log('Синхронизация табиц БД успешна')
    } catch (e) {
        console.log('Ошибка подклбючения к БД ', e.message)
    }
    
    app.listen(PORT, ()=>{
        console.log('Сервер запущен на порту ' + PORT)
    })
}

start()



