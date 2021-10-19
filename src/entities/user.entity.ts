import { assign } from 'lodash';
import { UserRoleEnum } from '../enums/user-role.enum';
import { BaseEntity } from './base.entity';

export class UserEntity extends BaseEntity {
  public login: string;

  public role: UserRoleEnum;
  
  public password: string;

  public balance: number;

  constructor(data: Partial<UserEntity>) {
    super(data);
    assign(this, data);
  }
}
