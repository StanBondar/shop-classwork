import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { ChatEntity } from "./chat.entity";
import { UserEntity } from "./user.entity";

@Entity({name: 'chatMembers'})
export class ChatMembersEntity extends Base {
  @Column()
  public userId: string;

  @Column()
  public chatId: string;

  @ManyToOne(() => ChatEntity)
  public chat: ChatEntity;

  @ManyToOne(() => UserEntity)
  public user: UserEntity;
}