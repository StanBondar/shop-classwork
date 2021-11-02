import { Request, Response } from 'express';
import { BaseEntity } from 'typeorm';
import { IEntityRequest } from '../types';
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
      await func.apply(this, [req, res, next]);
    } catch (err) {
      next(err);
    }
  };
}

export const checkEntityId = <T extends typeof BaseEntity>(entity: T) => {
  return async (
    req: IEntityRequest<BaseEntity>,
    res: Response,
    next: Function
  ) => {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send('Invalid item id provided');
    }

    const findedEntity = await entity.findOne(id);

    if (!findedEntity) {
      // return new HttpError("Invalid item id provided", 404);
      // TODO create wrapper for middleware and cover it
      return res.status(404).send('Invalid item id provided');
    }

    req.entity = findedEntity;
    next();
  };
};
