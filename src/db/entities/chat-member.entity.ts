import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { ChatEntity } from "./chat.entity";
import { UserEntity } from "./user.entity";

@Entity({name: 'chatMembers'})
export class ChatMembersEntity extends Base {
  @Column()
  public userId: number;

  @Column()
  public chatId: number;

  @ManyToOne(() => ChatEntity)
  public chat: ChatEntity;

  @ManyToOne(() => UserEntity)
  public user: UserEntity;
}



