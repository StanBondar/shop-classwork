import { assign } from 'lodash';
import { BaseEntity } from './base.entity';

export abstract class UserEntity extends BaseEntity {
  public login: string;

  public password: string;

  public balance: number;

  constructor(data: Partial<UserEntity>) {
    super(data);
    assign(this, data);
  }
}
