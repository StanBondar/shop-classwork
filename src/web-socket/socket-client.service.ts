import { Socket } from "socket.io";
import { ChatMembersEntity } from "../db/entities/chat-member.entity";
import { ChatEntity } from "../db/entities/chat.entity"
import { UserEntity } from "../db/entities/user.entity";
import { TSocket } from "../types";
import { SocketEventsEnum } from "./socket-events.enum";

export class WebSocketClientService {
  public static clients = new Map<number, Socket[]>()

  public static async emitEventToChat<T = any>(chatId:number, event:SocketEventsEnum, payload:T) {
    const chat = await ChatEntity.findOne(chatId);
    if(chat){
    const chatMembers = await chat.chatMembers;
    chatMembers.forEach(member => {
        const memberConnections = this.clients.get(member.userId) || [];

        memberConnections.forEach(connection => {
          connection.emit(event, payload);
        })
      });
    }
  }

  public static registerUserConnection(client:TSocket) {
    const user = client.handshake.auth.user;
    const isUserConnected = this.clients.has(user.id);

    if(!isUserConnected) {
      this.clients.set(user.id, [client])
    }else {
     const connections = this.clients.get(user.id);
     connections && this.clients.set(user.id, [...connections, client]);
    }
  }

  public static async emitEventToAllChats<T = any>(userIds: number[], event: SocketEventsEnum, payload: T, client:Socket&{handshake:{auth:{user:UserEntity}}}) {
    const user = client.handshake.auth.user;
    const clientChatMembers = await ChatMembersEntity.find({where: {user}});
    const filteredChatMembers = clientChatMembers.filter(member => {
      return userIds.includes(member.id);
    });
    const chats = filteredChatMembers.map(member => {
      this.emitEventToChat<T>(member.chatId, event, payload);
    });
  }
}