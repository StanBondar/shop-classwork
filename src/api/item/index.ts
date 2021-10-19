
  import { Router } from 'express';
  import { getItem } from './get';
  import { postItem } from './post';
  import { patchItem } from './patch';
  import { deleteItem } from './delete';
  import { putItem } from './put';

  const router = Router();

  router.get('/', getItem);
  router.post('/', postItem);
  router.patch('/', patchItem);
  router.delete('/', deleteItem);
  router.put('/', putItem);

  export default router; 
  