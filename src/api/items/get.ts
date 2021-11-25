import {Request,Response} from 'express';
import { ItemEntity } from '../../db/entities/item.entity';
import { HttpError, wrapper } from '../../tools/wrapper.helpers';
import { IRequest } from '../../types';

export const getItems = wrapper(async (req:IRequest, res:Response) => {
	const items = await ItemEntity.find();
	if(!items) {
		throw new HttpError('Something wrong', 500);
	}
	return res.send(items)
});

export const getItemById = wrapper(async (req:IRequest, res:Response) => {
	const {id} = req.params;

	const item = await ItemEntity.findOne(id);
	if(!item) {
		throw new HttpError('Something wrong', 500);
	}
	
	return res.send(item)
});