import { Router } from 'express';
import { getPurches } from './get';
import { putPurches } from './put';
import { postPurchases } from './post';
import { deletePurches } from './delete';
import { patchPurchases } from './patch';
import { PurchaseEntity } from '../../db/entities/purchase.entity';
import { checkEntityId } from '../../tools/wrapper.helpers';

const router = Router();

router.get('/', getPurches);
router.post('/', postPurchases);
router.put('/', putPurches);
router.delete('/', deletePurches);
router.patch('/:id', checkEntityId(PurchaseEntity), patchPurchases);

export default router;
