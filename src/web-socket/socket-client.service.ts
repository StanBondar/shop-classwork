import { Socket } from "socket.io";
import { ChatEntity } from "../db/entities/chat.entity"
import { UserEntity } from "../db/entities/user.entity";
import { SocketEventsEnum } from "./socket-events.enum";

export class WebSocketClientService {
  public static clients = new Map<number, Socket[]>()

  public static async emitEventToChat<T = any>(chatId:number, event:SocketEventsEnum, payload:T) {
    const chat = await ChatEntity.findOne(chatId);
    const chatMembers = await chat.chatMembers;
    chatMembers.forEach(member => {
      const memberConnections = this.clients.get(member.userId) || [];

      memberConnections.forEach(connection => {
        connection.emit(event, payload);
      })
    });
  }

  public static registerUserConnection(client:Socket&{handshake:{auth:{user:UserEntity}}}) {
    const user = client.handshake.auth.user;
    const isUserConnected = this.clients.has(user.id);

    if(!isUserConnected) {
      this.clients.set(user.id, [client])
    }else {
     const connections = this.clients.get(user.id);
     this.clients.set(user.id, [...connections, client]);
    }
  }
}

