import { Router } from 'express';
import * as sad from './get';
import { postPurches } from './post';
import { putPurches } from './put';
import { deletePurches } from './delete';
import { patchPurches } from './patch';

const router = Router();

router.get('/');
router.post('/', postPurches);
router.put('/', putPurches);
router.delete('/', deletePurches);
router.patch('/', patchPurches);

export default router;
