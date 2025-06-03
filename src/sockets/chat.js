export default function (io) {
  io.on('connection', (socket) => {
    const username = (socket.handshake.query.username || '').trim();
    socket.usernameValid = true;

    if (!username) {
      socket.usernameValid = false;
      socket.emit('chat message', 'Invalid username. Connection closed.');
      return socket.disconnect(true);
    }

    socket.broadcast.emit('chat message', `${username} connected`);
    socket.emit('chat message', `You joined as "${username}"`);

    socket.on('chat message', ({ message }) => {
      socket.broadcast.emit('chat message', `${username}: ${message}`);
      socket.emit('chat message', `Me (${username}): ${message}`);
    });

    socket.on('disconnect', () => {
      if (!socket.usernameValid) return;
      io.emit('chat message', `${username} disconnected`);
    });
  });
}
