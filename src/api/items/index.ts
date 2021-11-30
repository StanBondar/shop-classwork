import { Router } from 'express';
import { ItemEntity } from '../../db/entities/item.entity';
import { checkEntityId, validationMiddleware } from '../../tools/wrapper.helpers';
import { getItemById, getItems } from './get';
import { patchItem } from './patch';
import { postItems } from './post';
import { PatchItemRequest } from './requests/patch-item.request';
import { PostItemRequest } from './requests/post-item.request';

const router = Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', validationMiddleware(PostItemRequest), postItems);
router.patch('/:id', checkEntityId(ItemEntity), validationMiddleware(PatchItemRequest), patchItem);

export default router;
