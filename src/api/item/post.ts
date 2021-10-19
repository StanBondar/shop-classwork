import { Request, Response } from 'express';
import { map, max, pick } from 'lodash';
import { ITEMS, save } from '../../data/mocks';
import { ItemEntity } from '../../entities/item.entity';
export const postItem = async (req: Request, res: Response) => {
  const partialItem: Partial<ItemEntity> = pick(
    req.body,
    'sellerId',
    'title',
    'quantity',
    'price'
  );

  const id = max(map(ITEMS, 'id')) + 1;

  ITEMS.push(new ItemEntity({ ...partialItem, id }));

  await save();

  return res.send(`Item with id ${id} created!`);
};
