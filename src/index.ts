import express, { Request, Response } from 'express';
import { config } from 'dotenv';

config();

const port = process.env.APP_PORT || 3030;

const app = express();

app.get('/', async (req: Request, res: Response) => {
  console.log(req.url);

  res.send('Im alive!');
});

app.listen(port, () => console.log(`Started on port ${port}`));
