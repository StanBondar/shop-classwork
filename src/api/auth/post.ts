import { Request, Response } from 'express';
import { assign, pick } from 'lodash';
import { UserEntity } from '../../db/entities/user.entity';
import jwtService from '../../services/jwt.service';
import JwtService from '../../services/jwt.service';
import { HttpError, wrapper } from '../../tools/wrapper.helpers';
import { IRequest } from '../../types';

export const registration = wrapper(async (req: Request, res: Response) => {
  const data = pick(req.body, 'login', 'password', 'role');

  const isLoginInUse = !!(await UserEntity.findOne({ login: data.login }));

  if (isLoginInUse) {
    throw new HttpError('User already exists');
  }

  const user = new UserEntity();
  assign(user, data);

  await user.save();
  res.status(201).send(`User with id ${user.id} created!`);
});

export const login = async (req: Request, res: Response) => {
  const { password, login } = pick(req.body, 'password', 'login');
  const user = await UserEntity.findOne(
    { login },
    { select: ['password', 'id', 'role', 'login'] }
  );

  if (!user || !user.verifyPassword(password)) {
    return res.status(400).send('I dont know you bro');
  }
  const tokenPair = await JwtService.createTokenPair(user);
  // const token = JwtService.encode(user);
  return res.send(tokenPair);
};

export const refreshTokens = wrapper(async (req:IRequest, res:Response) => {
  const { refresh_token } = req.body;
  if(!refresh_token) {
    throw new HttpError('Please provide token', 403);
  }
  try{
    const tokenData = jwtService.decode(refresh_token);
    const user = await UserEntity.findOne({id: tokenData.id}, { select: ['password', 'id', 'role', 'login'] });
    if(!user){
      throw new HttpError('You has been vanished', 401);
    }
    const tokenPair = await JwtService.createTokenPair(user);
    res.status(200).send(tokenPair);
  }catch(err: any) {
    throw new HttpError(err.message, 401);
  }
});
