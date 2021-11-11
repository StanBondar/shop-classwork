import { createConfig } from './config/index';
import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import { registerRouters } from './api';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

createConfig();

const port = process.env.PORT || 3030;

const app = express();

app.get('/', async (req: Request, res: Response) => {
  console.log(req.url);

  res.send(`Im alive! ${port}`);
});

registerRouters(app);

// createConnection().then(() =>
app.listen(port, () => console.log(`Started on port ${port}`));
// );
