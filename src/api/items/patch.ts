import { Response } from "express";
import { pick } from "lodash";
import { ItemEntity } from "../../db/entities/item.entity";
import { wrapper } from "../../tools/wrapper.helpers";
import { IEntityRequest, IRequest } from "../../types";

export const patchItem = wrapper(async (req: IEntityRequest<ItemEntity>, res: Response) => {
  const item = req.entity;
  const {quantity, price} = pick(req.body, 'quantity', 'price');
  if(quantity) {
    item.quantity = quantity;
  }
  if(price) {
    item.price = price;
  }
  await item.save();
  res.status(200).send('Items has been updated');
})