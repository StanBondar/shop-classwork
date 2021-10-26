import { EnvConfig } from './../config/index';
import { createConfig } from '../config';
import express from 'express';
import { registerRouters } from '../api';
import { createConnection } from 'typeorm';

export const init = async () => {
  createConfig();

  const app = express();
  registerRouters(app);

  await createConnection();

  return app;
};
