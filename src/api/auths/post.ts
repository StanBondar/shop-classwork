import { Request, Response } from 'express';
import { assign } from 'lodash';
import { wrapper } from '..';
import { UserEntity } from '../../db/entity/user.entity';
import { UserRoleEnum } from '../../enums/user-role.enum';

export const registration = wrapper<
  { role: UserRoleEnum },
  Omit<UserEntity, 'id'>
>(async ({ body, params }) => {
  const user = new UserEntity();

  assign(user, body);

  return user;
});
