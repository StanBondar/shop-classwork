import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import { ItemEntity } from './entities/item.entity';
import { getRepository } from './mocks/repository';

config();

const port = process.env.APP_PORT || 3000;

const app = express();

app.get('/', async (req: Request, res: Response) => {
  console.log(req.url);

  res.send('Im alive!');
});

let a = getRepository<ItemEntity>(ItemEntity.name);

a.load().then(console.log());
app.listen(port, () => console.log(`Started on port ${port}`));
