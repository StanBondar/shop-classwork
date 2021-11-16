
  import {Response} from 'express';
import { CardEntity } from '../../db/entities/card.entity';
import { HttpError, wrapper } from '../../tools/wrapper.helpers';
import { IEntityRequest } from '../../types';

  export const deleteCards = wrapper(async (req:IEntityRequest<CardEntity>, res:Response) => {
    const card = req.entity;

    try{
      await CardEntity.remove(card);
      res.status(200).send(`Card *${card.number.slice(-4)} has been deleted successfully`);
    }catch(err) {
      throw new HttpError('Erroro during card deleting attempt');
    }
  });
  