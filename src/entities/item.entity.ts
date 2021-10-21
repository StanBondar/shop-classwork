import { assign } from 'lodash';
import { Column, ManyToOne } from 'typeorm';
import { Item } from '../db/entity/item.entity';
import { Base } from './base.entity';
import { UserEntity } from './user.entity';

export class ItemEntity extends Base {
  @Column()
  public price: number;

  @Column()
  public title: string;

  @Column()
  public quantity: number;

  @Column()
  public sellerId: number;

  @ManyToOne(() => UserEntity)
  public seller: UserEntity;
}
