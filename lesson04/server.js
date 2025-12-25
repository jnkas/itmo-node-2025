const http = require('http'); // подключение модуля
const fs = require('fs'); // подключение модуля для работы с файлом

const server = http.createServer((request, response) => {// вызов метода создания http сервера

    if (request.url === '/') {
        let html = ''
        fs.readFile("index.html", 'utf8', (err, data) => {
            if (err) {
                console.log('Could not find or open file for reading\n');
                response.statusCode = 404;
                response.end();
            } else {

                // console.log(data);
                // console.log(`The file ${filename} is read and sent to the client\n`);
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            }
        });
    } else if (request.url === '/script1.js') {
        let html = ''
        fs.readFile("script1.js", 'utf8', (err, data) => {
            if (err) {
                console.log('Could not find or open file for reading\n');
                response.statusCode = 404;
                response.end();
            } else {

                // console.log(data);
                // console.log(`The file ${filename} is read and sent to the client\n`);
                response.writeHead(200, { 'Content-Type': 'text/javaScript' });
                response.end(data);
            }
        });
    } else if (request.url === '/api/products') {
        fs.readFile("db_products.txt", 'utf8', (err, data) => {
            if (err) {
                console.log('Could not find or open file for reading\n');
                response.statusCode = 404;
                response.end();
            } else {

                console.log(typeof JSON.parse(data));
                
                // console.log(`The file ${filename} is read and sent to the client\n`);
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(data);
            }
        });

    }


    
           
    console.log("Request accepted!");
}).listen(3006, () => {
    console.log("HTTP server works in 3006 port!\n");
});