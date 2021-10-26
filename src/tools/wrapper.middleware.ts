import { Request, Response } from 'express';

import { Base } from '../db/entities/base.entity';

// export function wrapper<T >(

export class HttpError extends Error {
  public statusCode: number;

  constructor(message?: string, statusCode: number = 400) {
    super(message);

    this.statusCode = statusCode;
  }
}

export function wrapper(func: Function) {
  return async function (req: Request, res: Response, next: Function) {
    try {
      const response = await func.apply(this, arguments);

      return res.status(response?.code || 200).send(response?.data || response);
    } catch (err) {
      return res
        .status(err.code || 400)
        .send(`${err?.message || 'Something wrong.'}`);
    }
  };
}

export function wrapperMiddleware(func: Function) {
  return async function (req: Request, res: Response, next: Function) {
    try {
      await func.apply(this, arguments);

      return next();
    } catch (err: any) {
      return res
        .status((err as HttpError).statusCode || 400)
        .send(`${(err as HttpError)?.message || 'Something wrong.'}`);
    }
  };
}

export function getByIdMiddleware<T extends typeof Base>(Entity: T) {
  return async function (req: Request, res: Response, next: Function) {
    try {
      const { id } = req.params;

      const entity = Entity.findOne(id);

      (req as any).entity = entity;

      return next();
    } catch (err) {
      return res
        .status(err.code || 400)
        .send(`${err?.message || 'Something wrong.'}`);
    }
  };
}
