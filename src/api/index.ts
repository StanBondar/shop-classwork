import { Express, json, Request, Response } from 'express';
import { Query } from 'typeorm/driver/Query';
import { pick } from 'lodash';
import { EndpointHandler, RequestData } from '../types';
import authRouter from './auth';
export const registerRouters = (app: Express) => {
  app.use(json());
  app.use('/auth', authRouter);
};
