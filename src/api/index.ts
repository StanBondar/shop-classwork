import { HttpError } from './../tools/wrapper.helpers';
import { Express, json, Request, Response } from 'express';
import authRouter from './auth';
import { authMiddleware } from './auth/auth.middleware';
import { IRequest } from '../types';
import itemsRouter from './items';

export const registerRouters = (app: Express) => {
  app.use(json());
  app.use('/auth', authRouter);

  app.use('/', authMiddleware);
  app.use('/whoami', (req: IRequest, res: Response) => {
    return res.send(req.user);
  });

  app.use('/items', itemsRouter);

  app.use('/', (err: HttpError, req, res, next) => {
    res.status(err?.statusCode || 400).send(err?.message);
  });
};
