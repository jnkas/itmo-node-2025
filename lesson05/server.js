'use strict'
const http = require('http')
const fs = require('fs')

const handler = (request, response) => {

    let path

    if (request.url === '/') {

        path = './index.html'

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
    }
    
    else if (request.url.startsWith('/api/form')) {
        console.log(request.url)
        let parsedData = {}
        let params = request.url.split('?')[1]
        for (let item of params.split('&')) {
            let paramAsArray = item.split('=')
            parsedData[paramAsArray[0]] = paramAsArray[1]
        }
        console.log(parsedData)
    }
}
    
    const server = http.createServer(handler)
    
    server.listen(3009, (e)=>{
        if (e) console.log(e)
        console.log('сервер запущен port:3009')
    })