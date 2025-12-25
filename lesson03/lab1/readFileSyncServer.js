const http = require('http'); // подключение модуля
const fs = require('fs'); // подключение модуля для работы с файлом
// const filename = "index.html";

const server = http.createServer((request, response) => {// вызов метода создания http сервера

    if (request.url === '/') {
        let html = ''
        html += fs.readFileSync("header.html", 'utf8') 
        html += fs.readFileSync("body.html", 'utf8')
        html += fs.readFileSync("footer.html", 'utf8')

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html);
        
    }
    

           
    console.log("Request accepted!");
}).listen(3005, () => {
    console.log("HTTP server works in 3005 port!\n");
});