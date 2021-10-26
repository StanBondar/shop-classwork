import { Request, Response } from 'express';

import { Base } from '../db/entities/base.entity';
import { IRequest } from '../types';

export class HttpError extends Error {
  public statusCode: number;

  constructor(message?: string, statusCode: number = 400) {
    super(message);

    this.statusCode = statusCode;
  }
}

export function wrapper(func: Function) {
  return async function (req: IRequest, res: Response, next: Function) {
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
