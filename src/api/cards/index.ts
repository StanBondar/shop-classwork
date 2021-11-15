
import { Router } from 'express';
import { getCards } from './get';
import { postCards } from './post';
import { depositToAccount, withdrawFromAccount } from './patch';
import { deleteCards } from './delete';
import { checkEntityId, validationMiddleware } from '../../tools/wrapper.helpers';
import { CardEntity } from '../../db/entities/card.entity';
import { PostCardRequest } from './requests/post-card.request';


const router = Router();

router.get('/', getCards);
router.post('/', validationMiddleware(PostCardRequest), postCards);
router.patch('/withdraw/:id', checkEntityId(CardEntity), withdrawFromAccount);
router.patch('/deposit/:id', checkEntityId(CardEntity), depositToAccount);
router.delete('/:id', checkEntityId(CardEntity), deleteCards);


export default router; 
  