import { Express, json } from 'express';

import authRouter from './auth';

export const registerRouters = (app: Express) => {
  app.use(json());
  app.use('/auth', authRouter);
};
