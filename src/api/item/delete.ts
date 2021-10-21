import { Request, Response } from 'express';
import _ from 'lodash';
import { IRequest } from '../../enums/user-role.enum';

export const deleteItem = async (
  req: IRequest<{ test: string }>,
  res: Response
) => {
  let a = req.body;
  req.res.sendStatus(200);
};
