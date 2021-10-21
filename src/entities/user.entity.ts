import { assign } from 'lodash';
import { Column, OneToMany } from 'typeorm';
import { UserRoleEnum } from '../enums/user-role.enum';
import { Base } from './base.entity';
import { ItemEntity } from './item.entity';

export class UserEntity extends Base {
  @Column({
    type: 'text',
    unique: true,
  })
  public login: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.CUSTOMER,
  })
  public role: UserRoleEnum;

  @Column()
  public password: string;

  @Column({
    type: 'decimal',
    default: 300,
  })
  public balance: number;

  @OneToMany(() => ItemEntity, (item) => item.seller)
  public items: ItemEntity[];
}
