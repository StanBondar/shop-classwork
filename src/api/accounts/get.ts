
  import {Request,Response} from 'express';
import { In } from 'typeorm';
import { PurchaseEntity } from '../../db/entities/purchase.entity';
import { UserEntity } from '../../db/entities/user.entity';
import { UserRoleEnum } from '../../enums/user-role.enum';
import { HttpError, wrapper } from '../../tools/wrapper.helpers';
import { IEntityRequest } from '../../types';

  export const getAccounts = wrapper(async (req:IEntityRequest<UserEntity>, res:Response) => {
    const {entity, user} = req;

    if(user.role === UserRoleEnum.SELLER) {
      const items = await user.items;
      
      const purchases = await PurchaseEntity.find({
        where: {
          itemId: In(items.map(el => el.id))
        }
      })
      const customer = purchases.map(el => el.customerId).find(el => el === entity.id)
      if(!customer) {
        throw new HttpError('No user found', 404);
      }
      return res.status(200).send(entity); 
    }else {
      const purchases = await user.purchases;
      const items = purchases.map(async el => {
        const item = await el.item;
      });
      const seller = items.map(async (el) => {
        // const seller = await
      })
    }
  });
  