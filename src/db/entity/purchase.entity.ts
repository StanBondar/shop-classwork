import { Column, Entity, ManyToOne } from 'typeorm';
import { PurchaseStatusEnum } from '../../enums/purchase-status.enum';
import { Base } from './base.entity';
import { Item } from './item.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'purchases' })
export class PurchaseEntity extends Base {
  @Column({
    type: 'enum',
    enum: PurchaseStatusEnum,
    default: PurchaseStatusEnum.PENDING,
  })
  public status: PurchaseStatusEnum;

  @Column()
  public itemCount: number;

  @ManyToOne(() => UserEntity, (user) => user.purchases)
  public customer: UserEntity;

  @ManyToOne(() => Item)
  public item: Item;
}
