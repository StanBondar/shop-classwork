import { Express, json } from 'express';
import itemRouter from './item';

export const registerRouters = (app: Express) => {
  app.use(json());
  app.use('/items', itemRouter);
};
