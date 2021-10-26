import { Request } from 'express';

import { UserEntity } from './db/entities/user.entity';
import { UserRoleEnum } from './enums/user-role.enum';

export interface IRequest<T = never> extends Request {
  entity?: T;

  user: UserEntity;
}

export interface JwtPayload {
  role: UserRoleEnum;

  id: number;

  login: string;
}
