import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { ChatEntity } from "./chat.entity";
import { UserEntity } from "./user.entity";

@Entity({name: 'messages'})
export class MessageEntity extends Base {
  @Column()
  public data: string;

  @Column()
  public senderId: number;
  
  @Column()
  public chatId: number;

  @ManyToOne(() => ChatEntity)
  public chat: ChatEntity;

  @ManyToOne(() => UserEntity)
  public sender: UserEntity;
}