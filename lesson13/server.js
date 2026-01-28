const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
app = express();

app.use(cookieParser())

let counter = 0

app.use((req, res)=> {
    console.log(req.cookies)
    
    counter++

    

    res.cookie('test', counter, {
        path: '/',
        maxAge: new Date().getTime() + 120,
        httpOnly: true
    })

    res.status(200).send(`
        <h1> Вы посетили сайт ${counter} </h1>    
    `)

})


app.listen(3010)
