import { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { TMessage, TSocket } from '../types';
import { authSocketMiddleware } from './auth';
import { WebSocketClientService } from './socket-client.service';
import { SocketEventsEnum } from './socket-events.enum';

export const registerSockets = (app: Express) => {
  const server = createServer(app);

  const io = new Server(server, {
    cors: {
      credentials: true,
    },
  });

  io.use(authSocketMiddleware);

  io.on('connection', (client: TSocket) => {
    const user = client.handshake.auth.user;
    WebSocketClientService.registerUserConnection(client)

    client.on('test', () => {
      const connections = WebSocketClientService.clients.get(user.id);
      connections.forEach(connection => {
        connection.emit('test_connection', 'test all connection')
      })
    });

    client.on(SocketEventsEnum.SEND_MESSAGE, (payload: TMessage) => {
      const {data, chatId} = payload;
    })

    client.on('disconnect', () => {
      /* … */
    });
  });
  // io.use((socket: ISocketError, next) => {
  //   return socket._error(socket);
  // });

  return server;
};