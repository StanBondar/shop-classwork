import { UserEntity } from '../../db/entities/user.entity';
import JwtService from '../../services/jwt.service';
import { NextFunction, Response } from 'express';
import { IRequest } from '../../types';
import { UserRoleEnum } from '../../enums/user-role.enum';
import { wrapper } from '../../tools/wrapper.helpers';

export const authMiddleware = wrapper(async (req: IRequest, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || '').split(' ')[1];

  try {
    const { id } = JwtService.decode(token);
    const user = await UserEntity.findOne(id);
    if(user){
      req.user = user;
    }
    next();
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
});

export const authByRoleMiddleware = (role: UserRoleEnum) => {
  return async (req: IRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || user.role !== role) {
      return res.status(401).send('Invalid Token');
    }
    next();
  };
};
