import { Request, Response } from 'express';
import { filter } from 'lodash';
import { USERS } from '../../data/mocks';

export const getUser = async (req: Request, res: Response) => {
  return res.send(
    req.query.role ? filter(USERS, { role: req.query.role }) : USERS
  );
};
