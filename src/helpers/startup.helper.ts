import express from 'express';
import { createConnection } from 'typeorm';

import { registerRouters } from '../api';
import { createConfig } from '../config';

export const init = async () => {
  createConfig();

  const app = express();
  registerRouters(app);

  await createConnection();

  return app;
};
