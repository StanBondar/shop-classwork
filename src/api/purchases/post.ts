import { Response } from 'express';
import { assign, pick } from 'lodash';
import { PurchaseEntity } from '../../db/entities/purchase.entity';
import { IRequest } from '../../types';
import { HttpError, wrapper } from '../../tools/wrapper.helpers';
import { ItemEntity } from '../../db/entities/item.entity';
import { ChatMembersEntity } from '../../db/entities/chat-member.entity';
import { Not } from 'typeorm';
import { ChatEntity } from '../../db/entities/chat.entity';
import { UserRoleEnum } from '../../enums/user-role.enum';

export const postPurchases = wrapper(async (req: IRequest, res: Response) => {
  const { itemId, count } = pick(req.body, 'itemId', 'count');

  if(req.user.role === UserRoleEnum.SELLER) {
    throw new HttpError('You can not use seller account to buy items. Please log in as customer', 401);
  }

  const item = await ItemEntity.findOne(itemId);
  if (!item) {
    throw new HttpError('Invalid item chosen', 404);
  }
  if (item.quantity < count) {
    throw new HttpError(
      `Only ${item.quantity} items available, But you have chosen ${count}. Please check your cart`
    );
  }
  if(item.quantity === 0) {
    throw new HttpError('Can not purchase 0 items. Please choose one ore more item to make purchase');
  }

  const purchase = new PurchaseEntity();

  item.quantity = item.quantity - count;
  item.save();

  assign(purchase, { item, itemQuantity: count });
  purchase.customer = req.user;

  await purchase.save();

  const customer = req.user;

  const chatMembers = await customer.chatMembers;

  const companions = await Promise.all(chatMembers.map(chatMember => {
    return  ChatMembersEntity.findOne({where: {chatId:chatMember.chatId,userId:Not(customer.id)}});
  }));

  const { sellerId } = (await purchase.item);

  const isChatExist = companions.some(chatMember => {
    if(!chatMember) {
      return false;
    }
    return chatMember.userId === sellerId;
  })

  if(!isChatExist) {
    const chat = await new ChatEntity().save();

    const chatMember1 = new ChatMembersEntity();
    const chatMember2 = new ChatMembersEntity();
    chatMember1.chat = chat;
    chatMember1.userId = customer.id;
    
    chatMember2.chat = chat;
    chatMember2.userId = sellerId;

    await chatMember1.save();
    await chatMember2.save();
    return res.status(201).send(`Items has been purchased. Chat has been created and ou can contact with seller by chat id - ${chat.id}`);
  }

  const {chatId} = companions[0];
  return res.status(201).send(`Items has been purchased. You can contact with seller by chat id - ${chatId}`);
});


/* ! 


User: Stas, id 10;
ChatMembers: [{userId:10,chatId:10},{userId:10,chatId:20},{userId:10,chatId:30}]


User:Max, id 50;
ChatMembers: [{userId:50,chatId:70},{userId:50,chatId:60},{userId:50,chatId:40}]


Chats: [id:10, id:20,id:30,id:40,id:50,id:60,id:70]




*/