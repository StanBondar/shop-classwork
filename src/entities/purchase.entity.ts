import { assign } from 'lodash';
import { Column, ManyToOne } from 'typeorm';
import { PurchaseStatusEnum } from '../enums/purchase-status.enum';
import { Base } from './base.entity';
import { ItemEntity } from './item.entity';
import { UserEntity } from './user.entity';

export class PurchaseEntity extends Base {
  @Column({
    type: 'enum',
    enum: PurchaseStatusEnum,
    default: PurchaseStatusEnum.PENDING,
  })
  public status: PurchaseStatusEnum;

  @ManyToOne(() => ItemEntity)
  public item: ItemEntity;

  @ManyToOne(() => UserEntity)
  public customer: UserEntity;
}
