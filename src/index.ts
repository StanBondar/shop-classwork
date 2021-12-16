import 'reflect-metadata';

import express, { Request, Response } from 'express';

import { registerRouters } from './api';
import { createConfig, EnvConfig } from './config';
import { createConnections } from 'typeorm';
import cors from 'cors';
import { registerSockets } from './web-socket';
import path from 'path';
import { LogRecordModel } from './db/models/log-record.model';
import {getMongoRepository} from "typeorm";

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

createConnections().then(async () => {
  registerRouters(app)
  // const repo = getMongoRepository(LogRecordModel);
  // const test = await repo.insertOne({});
  // console.log(test);
  
  const server = registerSockets(app);
  server.listen(EnvConfig.PORT, () =>
    console.log(`Started on port ${EnvConfig.PORT}`)
  )
}).catch(err => {
  console.log('Connection error occured');
  console.log(err);
});