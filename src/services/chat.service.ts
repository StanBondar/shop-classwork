import { ChatEntity } from "../db/entities/chat.entity";
import { MessageEntity } from "../db/entities/message.entity";
import { TCreateMessagePayload } from "../types";

export class CChatService {
  public static async isChatMember(chatId: number, userId: number) {
    const chat = await ChatEntity.findOne(chatId);
    if(chat){
      const chatMembers = await chat.chatMembers;
      const isChatMember = chatMembers.some(chatMember => chatMember.userId === userId)
      return isChatMember;
    }
    return false;
  }

  public static async createMessage(payload: TCreateMessagePayload) {
    // const {chatId, data, senderId} = payload;
    const message = new MessageEntity(payload);
    // message.chatId = chatId;
    // message.data = data;
    // message.senderId = senderId;
    await message.save();
    return message;
  }

  public static async isMessageSender(messageId: number, userId: number) {
    const message = await MessageEntity.findOne(messageId);
    return message ? message.senderId === userId : false;
  }
}