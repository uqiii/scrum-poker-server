const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://192.168.0.100:3000', 'http://192.168.0.101:3000'],
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('send-message', (data) => {
    console.log(data);
    socket.broadcast.emit('receive-message', data);
  });
});

server.listen(3001, () => {
  console.log('Server running on 3001');
});
