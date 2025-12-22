'use strict'
const http = require('http')

let counter = 0

const server = http.createServer((request, response) =>{
    
    counter = counter + 1

    response.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>счетчик визитов: ${counter}</h1> 
        </body>
        </html>
    `)

    
})

server.listen(8080, ()=>{
    console.log(`веб сервер запущен. Порт: 8080`)
})
