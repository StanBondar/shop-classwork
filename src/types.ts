import { Request } from 'express';
import { UserEntity } from './db/entities/user.entity';

export interface IRequest extends Request {
  user: UserEntity;
}
