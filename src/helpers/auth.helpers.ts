import { Response } from 'express';

import { UserRoleEnum } from '../enums/user-role.enum';
import JwtService from '../services/jwt.service';
import { IRequest } from '../types';
import { wrapperMiddleware } from './wrapper.helper';

export const authMiddleware = wrapperMiddleware(
  async (req: IRequest, res: Response, next) => {
    req.user = await JwtService.decodeToken(req.headers.authorization);
  }
);

export const authByRoleMiddleware = (role: UserRoleEnum) => {
  return async (req: IRequest, res: Response, next) => {
    const user = req.user;
    if (!user || user.role !== role) {
      return res.status(401).send('Invalid Token');
    }
    next();
  };
};
