const http = require('http'); // подключение модуля
const fs = require('fs'); // подключение модуля для работы с файлом
const path = require('path') 


const { dirname } = require('path');
const PATH = dirname(require.main.filename);

// console.log(require)

const server = http.createServer((request, response) => {// вызов метода создания http сервера

    if (request.url.startsWith('/')) {

        console.log(request.url)
        let decodedURL = decodeURI(request.url).replaceAll('+', ' ')
        console.log(decodedURL)

        if (false) {
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



        
        console.log("Точка входа " + PATH )
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
                    if (product.name.search(parsedData.searchValue) >= 0 ) {
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
        let strData = '';
		
		request.on('data', (chunk)=>{
			strData += chunk;
		});
		
		request.on('end', (res)=>{
			console.log(strData);

            let userAuthData = JSON.parse(strData)

            let objRes = {
                message: '',
                auth: 0
            }

            if (userAuthData.email === 'admin@gmail.com' && userAuthData.password === '123') {
                console.log('Авторизация успешна');
                objRes.auth = 1
                objRes.message = 'Авторизация успешна'
            } else {
                objRes.message = 'Авторизация не успешна'
            }
            response.statusCode = 200;
            response.end(JSON.stringify(objRes));

			
			
		});	
    }


    
           
    console.log("Request accepted!");
}).listen(3006, () => {
    console.log("HTTP server works in 3006 port!\n");
});