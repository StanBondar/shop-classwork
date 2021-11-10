
import { Router } from 'express';
import { UserEntity } from '../../db/entities/user.entity';
import { checkEntityId } from '../../tools/wrapper.helpers';
import { getAccounts } from './get';


const router = Router();

router.get('/:id', checkEntityId(UserEntity), getAccounts);


export default router; 
  