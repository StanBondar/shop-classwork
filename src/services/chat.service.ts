import { ChatMembersEntity } from "../db/entities/chat-member.entity";
import { ChatEntity } from "../db/entities/chat.entity";
import { MessageEntity } from "../db/entities/message.entity";
import { TCreateMessagePayload } from "../types";

export class CChatService {
  public static async isChatMember(chatId: number, userId: number) {
    const isChatMember = await ChatMembersEntity.findOne({chatId, userId});
    return !!isChatMember;
  }

  public static async createMessage(payload: TCreateMessagePayload) {
    const message = new MessageEntity(payload);
    await message.save();
    return message;
  }

  public static async isMessageSender(messageId: number, userId: number) {
    const message = await MessageEntity.findOne(messageId);
    return message ? message.senderId === userId : false;
  }
}