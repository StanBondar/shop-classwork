import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Base } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity({name: 'cards'})
export class CardEntity extends Base {
  @Column()
  public cardNumber: number;
  
  @Column()
  public expiredDate: string;
  
  @Column()
  public cvv: string;
  
  @Column()
  public cardType: string;

  @Column()
  public userId: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  public user: UserEntity;
}