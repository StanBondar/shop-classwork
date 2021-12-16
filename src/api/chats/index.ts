
import { Router } from 'express';
import { getChatMessages, getChats } from './get';
import { postChatMessage } from './post';
import { deleteChats } from './delete';
import { checkEntityId, validationMiddleware } from '../../tools/wrapper.helpers';
import { ChatEntity } from '../../db/entities/chat.entity';
import { PostMessageRequest } from './requests/post-message.request';
import { MessageEntity } from '../../db/entities/message.entity';


const router = Router();

router.get('/', getChats);
router.get('/:id/messages', checkEntityId(ChatEntity), getChatMessages);
router.post('/:id/messages', checkEntityId(ChatEntity), validationMiddleware(PostMessageRequest), postChatMessage);
router.delete('/:id/messages/:messageId', checkEntityId(MessageEntity, 'messageId'), deleteChats);


export default router;