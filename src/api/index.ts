import { Express, json, Request, Response } from 'express';

import { authMiddleware } from '../helpers/auth.helpers';
import { HttpError } from '../helpers/wrapper.helper';
import { IRequest } from '../types';
import authRouter from './auth';

export const registerRouters = (app: Express) => {
  app.use(json());
  app.use('/auth', authRouter);
  app.use('/', authMiddleware);

  app.get('/whoami', async (req: IRequest, res: Response, next) => {
    return res.send(req.user);
  });

  app.use((err: HttpError, req: Request, res: Response, next: Function) => {
    console.error(err);
    return res.status(err.statusCode).send({ message: err.message }).end();
  });
};
