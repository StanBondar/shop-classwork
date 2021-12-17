import { UserEntity } from './db/entities/user.entity';
import { Request } from 'express';
import { UserRoleEnum } from './enums/user-role.enum';
import { BaseEntity } from 'typeorm';
import { ItemEntity } from './db/entities/item.entity';
import { Base } from './db/entities/base.entity';
import { Socket } from 'socket.io';
import { UserActionsEnum } from './enums/user-actions.enum';

export interface IRequest extends Request {
  user: UserEntity;
}

type a = typeof BaseEntity;

type b = Base;

const varA: a = BaseEntity;

const varB: b = new ItemEntity();

export interface IEntityRequest<T extends BaseEntity> extends Request {
  user: UserEntity;

  entity: T;
}

export interface JwtPayload {
  role: UserRoleEnum;

  id: number;

  login: string;
}

export type TCard = {
  number: string;
  cvv: string; 
  expired: string;
};

export type TSocket = Socket&{handshake:{auth:{user:UserEntity}}};

export type TMessage = {
  data: string;
  chatId: number;
}

export interface IChatPayload {
  userId: number;

  chatId: number;

  messageId: number;

  data: string;
}

export type TMessageBroadcast = {
  data: string;
  usersIds: number[];
}

export type TCreateMessagePayload = {
  data: string;
  chatId: number;
  senderId: number;
}

export type TEditMessagePayload = Pick<IChatPayload, 'messageId' | 'userId'>

export type TCreateLogRecord<TPayload extends Base> = {
  action: UserActionsEnum,
  userId: number,
  payload: TPayload 
}