
import { Router } from 'express';
import { getCards } from './get';
import { postCards } from './post';
import { patchCards } from './patch';
import { deleteCards } from './delete';


const router = Router();

router.get('/', getCards);
router.post('/', postCards);
router.patch('/', patchCards);
router.delete('/', deleteCards);


export default router; 
  