
import { Router } from 'express';
import { getChats } from './get';


const router = Router();

router.get('/', getChats);


export default router; 
  