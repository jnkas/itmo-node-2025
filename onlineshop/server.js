const http = require('http'); // подключение модуля
const fs = require('fs'); // подключение модуля для работы с файлом
const path = require('path')
const url = require('node:url');
const { router } = require('./server/router.js')


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

const mkdirp = require('mkdirp');

const made = mkdirp.sync('/tmp/foo/bar/baz')


const server = http.createServer(router).listen(3006, () => {
    console.log("HTTP server works in 3006 port!\n");
});