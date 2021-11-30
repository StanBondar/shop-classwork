
  import {Response} from 'express';
import { ChatEntity } from '../../db/entities/chat.entity';
import { wrapper } from '../../tools/wrapper.helpers';
import { IEntityRequest, IRequest } from '../../types';

  export const getChats = wrapper(async (req:IRequest, res:Response) => {
    const chatMembers = await req.user.chatMembers;
    const chats = chatMembers.map(chatMember => {
      return chatMember.chatId
    })
    res.status(200).send({body: chats});
  });
  
  export const getChatMessages = wrapper(async (req:IEntityRequest<ChatEntity>, res:Response) => {
    const chat = req.entity;
    res.sendStatus(200)
  });