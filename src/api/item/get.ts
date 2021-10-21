import { Request, Response } from 'express';
import { find, keys } from 'lodash';
import { wrapper } from '..';
import { ITEMS, USERS } from '../../data/mocks';
import { Item } from '../../db/entity/item.entity';
import { UserEntity } from '../../entities/user.entity';

export const getItem = wrapper(async ({ query }) => {
  if (!keys(query).length) throw new Error();
  return ITEMS;
});

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
