
  import {Response} from 'express';
import { ChatEntity } from '../../db/entities/chat.entity';
import { HttpError, wrapper } from '../../tools/wrapper.helpers';
import { IEntityRequest, IRequest } from '../../types';
import { MessageResponse } from './responses/message.response';

  export const getChats = wrapper(async (req:IRequest, res:Response) => {
    const chatMembers = await req.user.chatMembers;
    const chats = chatMembers.map(chatMember => {
      return {chatId: chatMember.chatId}
    })
    res.status(200).send({body: chats});
  });
  
  export const getChatMessages = wrapper(async (req:IEntityRequest<ChatEntity>, res:Response) => {
    const chat = req.entity;
    const chatMembers = await chat.chatMembers;
    const isChatMember = chatMembers.some(chatMember => chatMember.userId === req.user.id)
    if(!isChatMember) {
      throw new HttpError('You are not chat member', 401);
    }
    const chatMessages = (await chat.messages).map(message => {
      return new MessageResponse(message);
    });
    
    res.status(200).send(chatMessages)
  });