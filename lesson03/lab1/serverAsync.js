const http = require('http'); // подключение модуля
const fs = require('fs'); // подключение модуля для работы с файлом
// const filename = "index.html";

function createReadFilePromise(fileName){
	return new Promise((res, rej)=>{
		fs.readFile(fileName, 'utf-8', (err, data)=>{
			if(err) rej(err);
			else res(data);
		});
	});	
}

const server = http.createServer(async (request, response) => {// вызов метода создания http сервера

    let promise = createReadFilePromise("header.html")
    let html = ''
    let promise1 = new Promise((res, rej)=>{
		fs.readFile("body.html", 'utf-8', (err, data)=>{
			if(err) rej(err);
			else res(data);
		});
	});

    promise.then((data) => {

        return createReadFilePromise("body.html")
    }).then((data) => {

    }).then((data) => {

    }).then((data) => {

    }).catch()

    if (request.url === '/') {
        let html = ''
        fs.readFile("header.html", 'utf8', (err, data) => {
            if (err) {
                console.log('Could not find or open file for reading\n');
                response.statusCode = 404;
                response.end();
            } else {

                html += data 
            }
        });

        fs.readFile("body.html", 'utf8', (err, data) => {
            if (err) {
                console.log('Could not find or open file for reading\n');
                response.statusCode = 404;
                response.end();
            } else {
                html += data 
            }
        });

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

            }
        });

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html);
    }
    

           
    console.log("Request accepted!");
}).listen(3005, () => {
    console.log("HTTP server works in 3003 port!\n");
});