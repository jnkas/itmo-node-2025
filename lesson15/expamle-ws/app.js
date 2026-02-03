const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

server.listen(3011)

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('присоединился пользователь ID ' + socket.id);

  socket.emit('my-news', {hello: 'world'})

  socket.on('my-custom-event', function(data){
    console.log(data)
  })


  socket.on('disconnect', (reqason) => {
    console.log('пользователь отключился ID ' + socket.id)
  })
});