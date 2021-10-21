import { Router } from 'express';
import { registration, login } from './post';

const router = Router();

router.post('/registration', registration);
router.post('/login', login);

export default router;

export function wrapper(func) {
  return async function (req, res) {
    const result = func.call(this, arguments);

    res.send(result);
  };
}
