
  import {Response} from 'express';
import { ChatEntity } from '../../db/entities/chat.entity';
import { MessageEntity } from '../../db/entities/message.entity';
import { CChatService } from '../../services/chat.service';
import { HttpError, wrapper } from '../../tools/wrapper.helpers';
import { IEntityRequest } from '../../types';

  export const postChatMessage = wrapper(async (req:IEntityRequest<ChatEntity>, res:Response) => {
    const chat = req.entity;
    const isChatMember = await CChatService.isChatMember(chat.id, req.user.id);

    if(!isChatMember) {
      throw new HttpError('You are not chat member', 401);
    }

    const {data} = req.body;
    const {user: sender} = req;

    const message = new MessageEntity();
    message.chat = chat;
    message.data = data;
    message.sender = sender;
    await message.save();

    res.status(200).send('Message has been sent');
  });
  