//fs.readFile(path[, options], callback)
'use strict'
const http = require('http')
const fs = require('fs')

const handler = (request, response) => {

    let path

    if (request.url === '/') {

        path = './src/pages/index.html'

        fs.readFile(path, 'utf8', (err, data)=>{
            if (err) {
                console.log('1') 
            } else {
                console.log(data)
                response.statusCode = 200
                response.setHeader('Content-type', 'text/html')
                response.write(data)
                response.end() 
            }
            
        })
        
        
        // отдаем контент главной из index.html
    } else if (request.url === '/about') {
        // отдаем контент  из about.html
        //fs.readFile('./src/pages/about.html', callback)

        path = './src/pages/about.html'
        fs.readFile(path, 'utf8', (err, data)=>{
            if (err) {
                console.log('1') 
            } else {
                console.log(data)
                response.statusCode = 200
                response.setHeader('Content-type', 'text/html')
                response.write(data)
                response.end() 
            }
            
        })
    } else {
        // отдаем контент  из page-404.html
    }
}

const server = http.createServer(handler)

server.listen(3002, (e)=>{
    if (e) console.log(e)
    console.log('сервер запущен')
})