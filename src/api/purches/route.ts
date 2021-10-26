import { Router } from 'express';
import * as sad from './get';
import { postPurches } from './post';
import { putPurches } from './put';
import { deletePurches } from './delete';
import { patchPurches } from './patch';
import { getByIdMiddleware } from '../../helpers/wrapper.helper';
import { PurchaseEntity } from '../../db/entities/purchase.entity';

const router = Router();

router.get('/');
router.post('/', postPurches);
router.put('/', putPurches);
router.delete('/', deletePurches);
router.patch('/', patchPurches);

router.use('/:id', getByIdMiddleware(PurchaseEntity));

export default router;
