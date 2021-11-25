// export * as get from './get';
// export * as patch from './patch';
// export * as post from './post';
// export * as put from './put';

import { Router } from 'express';
import { getPurches } from './get';
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

router.get('/', getPurches);
router.post('/', validationMiddleware(PostPurchaseRequest), postPurchases);
router.patch(
  '/:id',
  checkEntityId(PurchaseEntity),
  validationMiddleware(PatchPurchaseRequest),
  patchPurchases
);

export default router;