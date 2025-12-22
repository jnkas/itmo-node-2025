'use strict'
const http = require('http')
const fs = require('node:fs');


const handler = (request, response) => {

    let pathname = 'src/pages/index.html';
    
    fs.readFile(pathname, 'utf8', (err, data) => {
        if (err) {
            console.log('Could not find or open file for reading\n');
            response.statusCode = 404;
            response.end();
        } else {
            console.log(`The file ${pathname} is read and sent to the client\n`);
            response.writeHead(200, {
            'Content-Type': 'text/html'
            });
            response.end(data);
        }
    });
}

const server = http.createServer(handler)

const port = process.env.PORT || 4000;
server.listen(port, (e)=>{
    if (e) console.log(e)
    console.log('сервер запущен')
})
