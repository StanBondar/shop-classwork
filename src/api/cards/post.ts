import { Response } from 'express';
import { assign, pick } from 'lodash';
import { CardEntity } from '../../db/entities/card.entity';
import { checkBalance } from '../../services/card.service';
import { HttpError, wrapper } from '../../tools/wrapper.helpers';
import { TCard, IRequest } from '../../types';

export const postCards = wrapper( async (req:IRequest, res:Response) => {
  if(!req?.body) {
    throw new HttpError('Card data has not been provided', 400);
  }

  const requiredCardField = ['number', 'expired', 'cvv'];
  const cardData: TCard = pick(req.body, 'number', 'expired', 'cvv');

  
  requiredCardField.forEach(el => {
    if(!(el in cardData)) {
      throw new HttpError(`Field "${el}" is required`);
    }
  });
  
  try {
    await checkBalance(cardData);
  }catch(err: any) {
    if(err?.response?.status === 404) {
      throw new HttpError('Invalid card data provided, please check card data or try another one.', 400);
    }
    throw new HttpError('Something went wrong.', 500);
  }
  

  const card = new CardEntity();
  assign(card, cardData);
  card.user = req.user;

  try{
    await card.save();
  }catch(err: any) {
    if(+err.code === 23505) {
      throw new HttpError('Your card has already been added, please try another one.', 400);
    }
    throw new HttpError('Error during creating card. Please try again later', 500);
  }

  return res.status(200).send(`Card successfully saved with id - ${card.id}`);
});