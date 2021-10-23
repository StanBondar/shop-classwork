import { Request, Response } from 'express';
import { pick } from 'lodash';
import { UserEntity } from '../../db/entities/user.entity';
import AuthService from '../../services/auth.service';

export const registration = async (req: Request, res: Response) => {
  await UserEntity.insert(pick(req.body, 'login', 'password', 'role'));

  res.sendStatus(201);
};

export const login = async (req: Request, res: Response) => {
  const { password, login } = pick(req.body, 'password', 'login');
  const user = await UserEntity.findOne({ login });

  if (!user || user.password !== password) {
    res.status(400).send('I dont know you bro');
  }

  const token = AuthService.encode(user);
  return res.send({ token });
};
