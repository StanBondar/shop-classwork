import { Request, Response } from 'express';
import { find } from 'lodash';
import { ITEMS, USERS } from '../../data/mocks';

export const getItem = async (req: Request, res: Response) => {
  res.send(ITEMS);
};

export const getItemById = async (req: Request, res: Response) => {
  const item = ITEMS.find(({ id }) => id === +req.params.id);

  return item ? res.send(item) : res.status(404).send('Item not found!');
};

export const getSellerByItemId = async (req: Request, res: Response) => {
  const item = find(ITEMS, { id: +req.params.id });

  return item
    ? res.send(find(USERS, { id: item.sellerId }))
    : res.status(404).send('Item not found!');
};
