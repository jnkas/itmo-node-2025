const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
app = express();

app.use(cookieParser())

let counter = {}

app.use((req, res)=> {
    console.log(req.cookies.test)
    if (req.cookies.test) {
        counter[req.cookies.test]++

        res.cookie('test', counter, {
            path: '/',
            maxAge: new Date().getTime() + 120,
            httpOnly: true
        })

        res.status(200).send(`
            <h1> Мы уже вас знаем. Вы посетили сайт ${counter} </h1>    
        `)
    } else {

        let id = new Date().getTime()
        counter[id] = 1

        res.cookie('test', counter[id], {
            path: '/',
            maxAge: new Date().getTime() + 120,
            httpOnly: true
        })

        res.status(200).send(`
            <h1>Вы - новый пользователь</h1>    
        `)
    }
    
    // counter = req.cookies.test
    

    

    

})


app.listen(3010)
