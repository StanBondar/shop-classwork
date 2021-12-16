
  import { Response } from 'express';
import { MessageEntity } from '../../db/entities/message.entity';
import { HttpError, wrapper } from '../../tools/wrapper.helpers';
import { IEntityRequest } from '../../types';

  export const deleteChats = wrapper(async (req:IEntityRequest<MessageEntity>, res:Response) => {
    const message = req.entity;
    if(message.senderId !== req.user.id) {
      throw new HttpError('You are not authorized to delete this messages');
    }
    await MessageEntity.remove(message);
    res.status(200).send('Message deleted successfully');
  });
  