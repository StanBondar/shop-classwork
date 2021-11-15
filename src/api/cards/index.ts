
import { Router } from 'express';
import { getCards } from './get';
import { postCards } from './post';
import { patchCards } from './patch';
import { deleteCards } from './delete';
import { checkEntityId } from '../../tools/wrapper.helpers';
import { CardEntity } from '../../db/entities/card.entity';


const router = Router();

router.get('/', getCards);
router.post('/', postCards);
router.patch('/', patchCards);
router.delete('/:id', checkEntityId(CardEntity), deleteCards);


export default router; 
  