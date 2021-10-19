import { Request, Response } from 'express';
import { ITEMS } from '../../data/mocks';

export const getItem = async (req: Request, res: Response) => {
  res.send(ITEMS);
};

export const getItemById = async (req: Request, res: Response) => {
  const item = ITEMS.find(({ id }) => id === +req.params.id);

  return item ? res.send(item) : res.status(404).send('Item not found!');
};
