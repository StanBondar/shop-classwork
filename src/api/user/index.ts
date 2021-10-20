
  import { Router } from 'express';
  import { getUser } from './get';
  import { postUser } from './post';
  import { patchUser } from './patch';
  import { deleteUser } from './delete';
  import { putUser } from './put';

  const router = Router();

  router.get('/', getUser);
  router.post('/', postUser);
  router.patch('/', patchUser);
  router.delete('/', deleteUser);
  router.put('/', putUser);

  export default router; 
  