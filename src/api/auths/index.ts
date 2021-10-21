import { Router } from 'express';
import { registration } from './post';

const router = Router();

router.post('/', registration);

export default router;
