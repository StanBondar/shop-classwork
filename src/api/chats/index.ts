
import { Router } from 'express';
import { getChatMessages, getChats } from './get';
import { postChats } from './post';
import { deleteChats } from './delete';
import { checkEntityId } from '../../tools/wrapper.helpers';
import { ChatEntity } from '../../db/entities/chat.entity';


const router = Router();

router.get('/', getChats);
router.get('/:id/messages', checkEntityId(ChatEntity), getChatMessages);
router.post('/', postChats);
router.delete('/', deleteChats);


export default router; 
  