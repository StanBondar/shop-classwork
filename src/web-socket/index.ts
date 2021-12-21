import { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { Not } from 'typeorm';
import { ChatMembersEntity } from '../db/entities/chat-member.entity';
import { MessageEntity } from '../db/entities/message.entity';
import { CChatService } from '../services/chat.service';
import { IChatPayload, TEditMessagePayload, TMessage, TMessageBroadcast, TSocket } from '../types';
import { authSocketMiddleware } from './auth';
import { errorHandlerMiddleware } from './error.middleware';
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

  io.use(errorHandlerMiddleware);

  io.on('connection', (client: TSocket) => {
    const user = client.data.user;
    WebSocketClientService.registerUserConnection(client)

    if(user){
      client.on('test', () => {
        const connections = WebSocketClientService.clients.get(user.id);
        connections && connections.forEach(connection => {
          connection.emit('test_connection', 'test all connection')
        })
      });

      client.on(SocketEventsEnum.SEND_MESSAGE, async (payload: TMessage) => {
        const {data, chatId} = payload;
        const isChatMember = await CChatService.isChatMember(chatId, user.id);
        
        if(!isChatMember) {
          return;
        }

        const message = await CChatService.createMessage({...payload, senderId: user.id});
        
        await WebSocketClientService.emitEventToChat<MessageEntity>(chatId, SocketEventsEnum.RECEIVE_MESSAGE, message);      
      })

      client.on(SocketEventsEnum.SEND_BROADCAST_MESSAGE, async (payload: TMessageBroadcast) => {
        const {data, usersIds} = payload;
        const myChatMembers = await user.chatMembers;
        
        const otherChatMembers = await Promise.all((myChatMembers.map(el => {
          return ChatMembersEntity.findOne({where: {chatId: el.chatId, userId: Not(el.id)}});
        })));

        await Promise.all(otherChatMembers.map(async member => {
          if(member && usersIds.includes(member.id)){
            return;
          }
          
          if(member){
            const message = await CChatService.createMessage({data, senderId: user.id, chatId: member.chatId});
            WebSocketClientService.emitEventToChat<MessageEntity>(member.chatId, SocketEventsEnum.RECEIVE_MESSAGE, message);
          }
        }))
      })

      client.on(SocketEventsEnum.EDIT_MESSAGE, async (payload: TEditMessagePayload) => {
        const {userId, messageId} = payload;
        const isChatMember = await CChatService.isMessageSender(messageId, userId);
        
        if(!isChatMember) {
          return;
        }

      })

      client.on('disconnect', () => {
        /* … */
      });
    }

  });
 
  return server;
};