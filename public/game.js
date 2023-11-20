const socket = io();

function createGame() {
  const gameId = document.getElementById('gameId').value;
  socket.emit('createGame', gameId);
}

function joinGame() {
  const gameId = document.getElementById('gameId').value;
  socket.emit('joinGame', gameId);
}

socket.on('gameStart', (message) => {
  document.getElementById('gameStatus').innerText = message;
});

socket.on('errorMsg', (message) => {
  document.getElementById('gameStatus').innerText = message;
});
