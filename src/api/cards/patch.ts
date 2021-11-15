
  import {Response} from 'express';
import { pick } from 'lodash';
import { CardEntity } from '../../db/entities/card.entity';
import { depositToCard, withdrawFromCard } from '../../services/card.service';
import { HttpError, wrapper } from '../../tools/wrapper.helpers';
import { IEntityRequest } from '../../types';

export const depositToAccount = wrapper(async (req:IEntityRequest<CardEntity>, res:Response) => {
  const {entity: card, user} = req;
  const {sum} = req.body;
  
  if(!sum) {
    throw new HttpError('"sum" field has not been provided');
  }

  const cardData = pick(card, 'number', 'cvv', 'expired');

  try{
    const remainingBalance = await withdrawFromCard(cardData, sum);
    user.balance = +user.balance + +sum;
    await user.save();
    return res.status(201).send(`${sum} sent from card to your account. New account balance - ${user.balance}. Remaining on card - ${remainingBalance}`)
  }catch(err) {
    throw new HttpError(err.response.data, err.response.status);
  }
});

export const withdrawFromAccount = wrapper(async (req:IEntityRequest<CardEntity>, res:Response) => {
  const {entity: card, user} = req;
  const {sum} = req.body;
  
  if(!sum) {
    throw new HttpError('"sum" field has not been provided');
  }

  try{
    const remainingBalance = await depositToCard(card.number, sum);
    user.balance = +user.balance - +sum;
    await user.save();
    return res.status(201).send(`${sum} sent from your account to your card. Remaining account balance - ${user.balance}. New card balance - ${remainingBalance}`)
  }catch(err) {
    throw new HttpError(err.response.data, err.response.status);
  }
});