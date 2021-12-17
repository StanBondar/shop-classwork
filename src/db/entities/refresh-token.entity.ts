import { extend } from "lodash";
import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({name: "refresh_token"})
export class RefreshToken extends Base{
  @Column({
    type: 'text'
  })
  public refresh_token: string;
}