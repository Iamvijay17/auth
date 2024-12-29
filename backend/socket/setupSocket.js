import { Server } from 'socket.io';

export let io;

export const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    transports: ['websocket', 'polling'],
  });

  const notificationNamespace = io.of('/api/v1/notifications');


  import('./userSocketMap.js').then((module) => {
    module.handleUserConnections(notificationNamespace);
  });

  return io;
};
