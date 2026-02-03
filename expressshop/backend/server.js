
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

    if (!authHeader) {
        req.user = null; // гость
        return next();
    }

    // console.log("token", authHeader)
    const token = authHeader.split(" ")[1]
    req.user = {
        token: token,
        role: (token === "admin-token-123" ? "admin" : "user" )
    }

    next()
}

function adminOnly (req, res, next) {
    if(req.user) {
        req.user.role === "admin"
        return next()
    } else {
        return res.status(403).json({ message: 'Access denied' });
    }
}

function userOnly (req, res, next) {
    if(req.user) {
        req.user.role === "user"
        return next()
    } else {
        return res.status(403).json({ message: 'Access denied' });
    }
}

// app.use(cors())  на все запросы

app.use(express.json())

//тут мы определим пользователя
app.use(userIdentify)

//определим его роль


app.use('/api', cors(), apiRouter)
// app.use('/api/admin', adminOnly, apiADMINRouter)


app.listen(PORT, ()=>{
    console.log('Сервер запущен на порту ' + PORT)
})


