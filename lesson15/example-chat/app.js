const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

server.listen(3011)

app.use(express.static('public'))

let history_message = []

io.on('connection', (socket) => {
  console.log('присоединился пользователь ID ' + socket.id);

  socket.emit('history', history_message)

  socket.on('new-message', (data)=>{
    //Принимаем сообщение
    data.id = socket.id
    history_message.push(data)

    //ограничение в 20 сообщений
    if (history_message.length > 20) {
      history_message.shift()
    }

    console.log(history_message)


    io.sockets.emit('new-message', data)

  })



  socket.on('disconnect', (reqason) => {
    console.log('пользователь отключился ID ' + socket.id)
  })
});