import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";

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
}