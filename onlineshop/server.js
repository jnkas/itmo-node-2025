const http = require('http'); // подключение модуля
const fs = require('fs'); // подключение модуля для работы с файлом
const path = require('path')
const url = require('node:url');


const { dirname } = require('path');
const PATH = dirname(require.main.filename);

// console.log(require)

/* 
    4 основных мегазадачи для применения Node.js
    - Сервер http для frontend
    - Сервер http для Backend
    - middleWare
    - Сборка фронтенда

*/

const ADMIN_TOKEN = 'Bearer admin_token_123'

const middlewareAuthController = (token) => {
    // if (!token) token.split(' ')[1]
    let isTokenCorrect = false
    if (token === ADMIN_TOKEN) isTokenCorrect = true
    return isTokenCorrect
}

const server = http.createServer((request, response) => {// вызов метода создания http сервера

    if (request.url === '/' && request.method === 'GET') {

        // console.log(request.url)
        // let decodedURL = decodeURI(request.url).replaceAll('+', ' ')
        // console.log(decodedURL)

        console.log(middlewareAuthController(request.headers.authorization))

        if (middlewareAuthController(request.headers.authorization)) {

            fs.readFile("src/index.html", 'utf8', (err, data) => {
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
        } else {
            fs.readFile("src/auth.html", 'utf8', (err, data) => {
                if (err) {
                    console.log('Could not find or open file for reading\n');
                    response.statusCode = 404;
                    response.end();
                } else {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(data);
                }
            })
        }




        console.log("Точка входа " + PATH)
        let html = ''

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

    } else if (request.url.startsWith('/api/find')) {
        console.log(request.url)
        let decodedURL = decodeURI(request.url).replaceAll('+', ' ')
        let parsedData = {}
        let params = decodedURL.split('?')[1]
        for (let item of params.split('&')) {
            let paramAsArray = item.split('=')
            parsedData[paramAsArray[0]] = paramAsArray[1]
        }
        console.log(parsedData)
        //данные получены и разобраны

        fs.readFile("db_products.txt", 'utf8', (err, data) => {
            if (err) {
                console.log('Could not find or open file for reading\n');
                response.statusCode = 404;
                response.end();
            } else {

                let products_all = JSON.parse(data)

                let acc = []

                for (let product of products_all) {
                    if (product.name.search(parsedData.searchValue) >= 0) {
                        acc.push(product)
                    }
                }
                if (acc.length === 0) {
                    console.log('Совпадений нет')
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify(acc));
                } else {
                    console.log('Найдено ' + acc.length + 'рез')
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify(acc));
                }


            }
        });



    } else if (request.url === '/api/validateUserData') {
        // console.log(request)

        let straem_read_file = fs.createReadStream('db_users.txt');
        let strData = '';

        

        request.on('data', (chunk) => {
            strData += chunk;
        });

        request.on('end', (res) => {
            console.log(strData);

            let userAuthData = JSON.parse(strData)

            let objRes = {
                message: '',
                auth: 0
            }

            straem_read_file.on('data', (chunk)=>{
                // res.write(chunk);
                console.log()
                let chunkAsObj = JSON.parse(chunk.toString())
                
                if (userAuthData.email === chunkAsObj.email && userAuthData.password === chunkAsObj.password) {
                // if (userAuthData.email === 'admin@gmail.com' && userAuthData.password === '123') {
                    console.log('Авторизация успешна');
                    objRes.auth = ADMIN_TOKEN
                    objRes.message = 'Авторизация успешна'
                } else {
                    objRes.message = 'Авторизация не успешна'
                }
            });

            straem_read_file.on('end', ()=>{

                
                response.statusCode = 200;
                response.end(JSON.stringify(objRes));
            });

        });
    } else if (request.url === '/register' && request.method === 'GET') {
        fs.readFile("src/register.html", 'utf8', (err, data) => {
            if (err) {
                console.log('Could not find or open file for reading\n');
                response.statusCode = 404;
                response.end();
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            }
        })

    } else if (request.url === '/api/registrationUser' && request.method === 'POST') {
   
            // let pathname = url.parse(request.url).path;
            // pathname = decodeURI(pathname.substring(1, pathname.length));
            let newFileStream = fs.createWriteStream('db_users.txt');

            request

                .on('data', function (chunk) {

                    console.log(chunk.toString())
                    let userData = JSON.parse(chunk.toString())
                    userData.id = 1
                    userData.created_date = new Date().toDateString()
                    let d = JSON.stringify(userData)


                    newFileStream.write(d);
                
                })
                .on('end', function () {

                    newFileStream.end();
                    response.writeHead(200);
                    response.end();

                });

        
    }




    console.log("Request accepted!");
}).listen(3006, () => {
    console.log("HTTP server works in 3006 port!\n");
});