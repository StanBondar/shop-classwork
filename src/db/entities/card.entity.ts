import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity({name: 'cards'})
export class CardEntity extends Base {
  @Column({unique: true})
  public number: string;
  
  @Column()
  public expired: string;
  
  @Column()
  public cvv: string;

  @Column()
  public userId: number;

  @ManyToOne(() => UserEntity)
  public user: UserEntity;
}