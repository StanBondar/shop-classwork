import { Router } from 'express';
import { getAccounts } from './get';

import {
  checkEntityId,
  PatchPurchaseRequest,
  validationMiddleware,
} from '../../tools/wrapper.helpers';
import {PurchaseEntity} from "../../db/entities/purchase.entity";
import {UserEntity} from "../../db/entities/user.entity";

const router = Router();

router.get('/:id',
    checkEntityId(UserEntity),
    getAccounts
);

export default router;
