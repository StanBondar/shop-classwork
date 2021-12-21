import { Router } from 'express';
import { getPurchases } from './get';
import { postPurchases } from './post';
import { patchPurchases } from './patch';
import { PurchaseEntity } from '../../db/entities/purchase.entity';
import {
  checkEntityId,
  PatchPurchaseRequest,
  validationMiddleware,
} from '../../tools/wrapper.helpers';
import { PostPurchaseRequest } from './requests/post-purchase.request';

const router = Router();

router.get('/', getPurchases);
router.post('/', validationMiddleware(PostPurchaseRequest), postPurchases);
router.patch(
  '/:id',
  checkEntityId(PurchaseEntity),
  validationMiddleware(PatchPurchaseRequest),
  patchPurchases
);

export default router;