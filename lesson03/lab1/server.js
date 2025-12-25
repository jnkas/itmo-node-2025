const http = require('http'); // подключение модуля
const fs = require('fs'); // подключение модуля для работы с файлом
// const filename = "index.html";

const tplHome = new TemplateManager() 

tplHome.header().body(data).footer()

const server = http.createServer((request, response) => {// вызов метода создания http сервера

    if (request.url === '/') {
        let html = ''
        fs.readFile("header.html", 'utf8', (err, data) => {
            if (err) {
                console.log('Could not find or open file for reading\n');
                response.statusCode = 404;
                response.end();
            } else {

                html += data 

                fs.readFile("body.html", 'utf8', (err, data) => {
                    if (err) {
                        console.log('Could not find or open file for reading\n');
                        response.statusCode = 404;
                        response.end();
                    } else {
                        html += data 
                        
                        fs.readFile("footer.html", 'utf8', (err, data) => {
                            if (err) {
                                console.log('Could not find or open file for reading\n');
                                response.statusCode = 404;
                                response.end();
                            } else {
                                html += data
                                // html.replace(/(\r\n|\n|\r)/g, '')
                                console.log(html);
                            
                            
                                // console.log(data);
                                // console.log(`The file ${filename} is read and sent to the client\n`);
                                response.writeHead(200, { 'Content-Type': 'text/html' });
                                response.end(html);
                            }
                        });
                    }
                });


                // console.log(data);
                // // console.log(`The file ${filename} is read and sent to the client\n`);
                // response.writeHead(200, { 'Content-Type': 'text/html' });
                // response.end(data);
            }
        });
    }
    

           
    console.log("Request accepted!");
}).listen(3004, () => {
    console.log("HTTP server works in 3004 port!\n");
});