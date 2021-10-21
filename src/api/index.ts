import { Express, json, Request, Response } from 'express';
import { Query } from 'typeorm/driver/Query';
import itemRouter from './item';
import userRouter from './user';
import { pick } from 'lodash';
import { EndpointHandler, RequestData } from '../types';
import purchesRouter from "./purches/index;

export const registerRouters = (app: Express) => {
  app.use(json());
  app.use('/items', itemRouter);
  app.use('/users', userRouter);
};

export function wrapper<
  P = {
    [key: string]: string;
  },
  ReqBody = any,
  ReqQuery = { [key: string]: undefined | string | string[] }
>(func: EndpointHandler<P, ReqBody, ReqQuery>) {
  return async function (req: Request, res: Response) {
    try {
      const data: Partial<{ body: ReqBody; params: P; query: ReqQuery }> = pick(
        req,
        'body',
        'query',
        'params'
      ) as unknown;
      const response = await func.call(data);

      return res.status(response?.code || 200).send(response?.data || response);
    } catch (err) {
      return res
        .status(err.code || 400)
        .send(`${err?.message || 'Something wrong.'}`);
    }
  };
  app.use("/purches", purchesRouter);
}
