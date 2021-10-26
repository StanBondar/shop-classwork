import { Request, Response } from 'express';

import { Base } from '../db/entities/base.entity';
import { IRequest } from '../types';

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
      await func.apply(this, arguments);
    } catch (err) {
      next(err);
    }
  };
}

export function wrapperMiddleware(func: Function) {
  return async function (req: Request, res: Response, next: Function) {
    try {
      await func.apply(this, arguments);

      return next();
    } catch (err: any) {
      next(err);
    }
  };
}

export function getByIdMiddleware<T extends typeof Base>(Entity: T) {
  return async function (req: IRequest<T>, res: Response, next: Function) {
    try {
      const { id } = req.params;

      const entity = (await Entity.findOne(id)) as unknown as T;

      req.entity = entity;

      return next();
    } catch (err) {
      next(err);
    }
  };
}
