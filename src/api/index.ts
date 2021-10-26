import { Express, json, Request, Response } from 'express';
import { Query } from 'typeorm/driver/Query';
import { pick } from 'lodash';
import authRouter from './auth';
import { HttpError } from '../helpers/wrapper.helper';
import { authMiddleware } from '../helpers/auth.helpers';
import { IRequest } from '../types';
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
