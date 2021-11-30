
import { Router } from 'express';
import { getChats } from './get';
import { postChats } from './post';
import { deleteChats } from './delete';


const router = Router();

router.get('/', getChats);
router.post('/', postChats);
router.delete('/', deleteChats);


export default router; 
  