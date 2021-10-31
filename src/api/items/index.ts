import { Router } from 'express';
import { getItems } from './get';
import { postItems } from './post';

const router = Router();

router.post('/', postItems);
router.get('/', getItems);

export default router;
