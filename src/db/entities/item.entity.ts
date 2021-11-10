import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { PurchaseEntity } from './purchase.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'items' })
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

  @OneToMany(() => PurchaseEntity, purchase => purchase.item)
  public purchases: Promise<PurchaseEntity[]>;
}
