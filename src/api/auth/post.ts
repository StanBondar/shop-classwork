import { Request, Response } from 'express';
import { assign, pick } from 'lodash';
import { UserEntity } from '../../db/entities/user.entity';
import { HttpError, wrapper } from '../../helpers/wrapper.helper';
import JwtService from '../../services/jwt.service';

export const registration = wrapper(async (req: Request, res: Response) => {
  const { login, password, role } = pick(req.body, 'login', 'password', 'role');

  const existedUser = await UserEntity.findOne({ login });

  if (existedUser) {
    new HttpError('Login is busy!', 400);
  }

  const user = new UserEntity();
  assign(user, { login, password, role });

  await user.save();
  res.sendStatus(201);
});

export const login = wrapper(async (req: Request, res: Response) => {
  const token = JwtService.login(pick(req.body, 'password', 'login'));
  return res.send({ token });
});
