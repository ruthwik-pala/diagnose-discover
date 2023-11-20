const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const games = {};

io.on('connection', (socket) => {
  socket.on('createGame', (gameId) => {
    games[gameId] = { players: [], gameId };
    socket.join(gameId);
    console.log(`Game created with ID: ${gameId}`);
  });

  socket.on('joinGame', (gameId) => {
    if (games[gameId] && games[gameId].players.length < 2) {
      socket.join(gameId);
      games[gameId].players.push(socket.id);
      console.log(`Player joined game: ${gameId}`);
      if (games[gameId].players.length === 2) {
        io.to(gameId).emit('gameStart', 'Game has started!');
      }
    } else {
      socket.emit('errorMsg', 'Unable to join game.');
    }
  });
});

app.use(express.static('public'));

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
