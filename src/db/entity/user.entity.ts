import { assign } from 'lodash';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRoleEnum } from '../../enums/user-role.enum';
import { Base } from './base.entity';
import { Item } from './item.entity';
import { PurchaseEntity } from './purchase.entity';

@Entity({ name: 'users' })
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

  @Column()
  public firstName: string;

  @Column({
    nullable: true,
  })
  public lastName?: string;

  @OneToMany(() => Item, (item) => item.seller)
  public items: Item[];

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.customer)
  public purchases: PurchaseEntity[];
}
