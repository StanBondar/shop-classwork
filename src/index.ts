import 'reflect-metadata';

import express, { Request, Response } from 'express';

import { registerRouters } from './api';
import { createConfig, EnvConfig } from './config';

createConfig();

const app = express();

app.get('/', async (req: Request, res: Response) => {
  console.log(req.url);

  res.send(`Im alive! ${EnvConfig.PORT}`);
});

registerRouters(app);

// createConnection().then(() =>
app.listen(EnvConfig.PORT, () =>
  console.log(`Started on port ${EnvConfig.PORT}`)
);
// );
