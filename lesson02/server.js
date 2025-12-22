'use strict'
const http = require('http')

const handler = (request, response) => {
    console.log(request.method)
    console.log(request.url)
    console.log(request.httpVersion)
    console.log(request.headers)

    try {
        // request.fff()
    } catch (e){
        console.log("ошибка ")
        response.statusCode = 500
        response.end('')
    }

    if (request.url == '/') {
        response.statusCode = 200
        response.setHeader('Content-type', 'text/html')
        response.end(
            `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <h1>Главная</h1> 
                </body>
            </html>
            `
        )
    } else if (request.url == '/profile') {
        response.statusCode = 200
        response.end(
            `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <style>
                     .p {
                        color:black
                     }
                    </style>
                    <p>Имя пользователя:</p> 
                    <p>Пароль:</p> 
                </body>
            </html>
            `
        )

    } else {
        response.statusCode = 404
        response.end(
            `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <style>
                     .p {
                        color:red
                     }
                    </style>
                    <p>404: Страница не найдена</p> 
                </body>
            </html>
            `
        )
    }
    
    

}

const server = http.createServer(handler)

server.listen(3000, (e)=>{
    if (e) console.log(e)
    console.log('сервер запущен')
})