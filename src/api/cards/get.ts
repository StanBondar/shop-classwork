
  import {Request,Response} from 'express';
import { IRequest } from '../../types';

  export const getCards = async (req:IRequest, res:Response) => {
    res.sendStatus(200);
  };
  