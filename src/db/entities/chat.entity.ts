import { Entity, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { ChatMembersEntity } from "./chat-member.entity";
import { MessageEntity } from "./message.entity";

@Entity({name: 'chats'})
export class ChatEntity extends Base {
  
  @OneToMany(() => ChatMembersEntity, member => member.chat)
  chatMembers: Promise<ChatMembersEntity []>

  @OneToMany(() => MessageEntity, message => message.chat)
  messages: Promise<MessageEntity[]>
}