import { Request, Response } from 'express';
import { assign, pick } from 'lodash';
import { UserEntity } from '../../db/entities/user.entity';
import JwtService from '../../services/auth.service';

export const registration = async (req: Request, res: Response) => {
  const user = new UserEntity();

  assign(user, pick(req.body, 'login', 'password', 'role'));

  await user.save();
  res.sendStatus(201);
};

export const login = async (req: Request, res: Response) => {
  const { password, login } = pick(req.body, 'password', 'login');
  const user = await UserEntity.findOne(
    { login },
    { select: ['password', 'id', 'role', 'login'] }
  );

  if (!user || !user.verifyPassword(password)) {
    return res.status(400).send('I dont know you bro');
  }
  const token = JwtService.encode(user);
  return res.send({ token });
};
