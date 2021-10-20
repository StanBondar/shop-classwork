import { Express, json } from 'express';
import itemRouter from './item';
import userRouter from './user';

export const registerRouters = (app: Express) => {
  app.use(json());
  app.use('/items', itemRouter);
  app.use('/users', userRouter);
};
