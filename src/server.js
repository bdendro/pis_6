import { createServer } from 'node:http';
import { Server } from 'socket.io';
import app from './app.js';
import socketHandler from './sockets/chat.js';

const server = createServer(app);
const io = new Server(server);

socketHandler(io);

server.listen(process.env.APP_PORT, () => {
  console.log(`Express server is listening on http://localhost:${process.env.APP_PORT}`);
});

process.on('SIGINT', async () => {
  console.log('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM');
  process.exit(0);
});
