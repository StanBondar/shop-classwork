import 'reflect-metadata';

import express, { Request, Response } from 'express';

import { registerRouters } from './api';
import { createConfig, EnvConfig } from './config';
import { createConnection } from 'typeorm';
import {Server} from 'socket.io';
import {createServer} from 'http';
import cors from 'cors';
import { authSocketMiddleware } from './web-socket/auth';
import { registerSockets } from './web-socket';
import path from 'path';

createConfig();

const app = express();
app.use(cors());

app.get('/', async (req: Request, res: Response) => {
  console.log(req.url);

  res.send(`Im alive! ${EnvConfig.PORT}`);
});


app.get('/support', (req, res) => {
  res.sendFile(path.join(__dirname, 'markup', 'chat.html'))
});

createConnection().then(() => {
  registerRouters(app)

  const server = registerSockets(app);
  server.listen(EnvConfig.PORT, () =>
    console.log(`Started on port ${EnvConfig.PORT}`)
  )
}).catch(err => {
  console.log('Connection error occured');
  console.log(err);
});
