
import {Response} from 'express';
import { wrapper } from '../../tools/wrapper.helpers';
import { IRequest } from '../../types';
import { CardResponse } from './responses/card.response';

export const getCards = wrapper(async (req:IRequest, res:Response) => {
  const {user} = req;
  const cards = (await user.cards).map(el => new CardResponse(el));
  res.status(200).send(cards);
});