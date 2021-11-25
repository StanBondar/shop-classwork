import { Router } from 'express';
import { validationMiddleware } from '../../tools/wrapper.helpers';
import { getItemById, getItems } from './get';
import { postItems } from './post';
import { PostItemRequest } from './requests/post-item.request';

const router = Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', validationMiddleware(PostItemRequest), postItems);

export default router;
