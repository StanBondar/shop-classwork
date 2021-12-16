import { HttpError, wrapper } from './../tools/wrapper.helpers';
import { Express, json, NextFunction, Response, Request } from 'express';
import authRouter from './auth';
import { authMiddleware } from './auth/auth.middleware';
import { IRequest } from '../types';
import itemsRouter from './items';
import purchasesRouter from './purchases';
import { pick } from 'lodash';
import accountsRouter from './accounts';
import fileUpload, { UploadedFile } from 'express-fileupload';
import path from 'path';
import cardsRouter from './cards';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swag.json';
import chatsRouter from './chats';

export const registerRouters = (app: Express) => {
  app.use(json());
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('/auth', authRouter);

  const filesPath = path.join(__dirname, '../db/files/');
  app.use(fileUpload());

  app.post('/upload', async (req, res: Response) => {
    if(req?.files){
      const file = req.files.test as UploadedFile;
      await file.mv(filesPath + file.name);
      return res.send('Success');
    }
    // return res.download(filesPath + '1.jpg');
  });

  app.get('/download/:fileName', async (req, res) => {
    const file = `${filesPath}${req.params.fileName}`;

    return res.download(file);
  });

  app.use('/', authMiddleware);
  
  app.use('/whoami', wrapper((req: IRequest, res: Response) => {
    return res.send(req.user);
  }));

  app.use('/purchases', purchasesRouter);
  app.use('/items', itemsRouter);
  app.use('/accounts', accountsRouter);
  app.use('/accounts', accountsRouter);
  app.use('/cards', cardsRouter);
  app.use('/chats', chatsRouter);

  app.use('/', (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    // TODO check why omit returns empty object, even if message field exists in err object;
    // res.status(err?.statusCode || 400).send(omit(err, 'statusCode'));
    // const error = {
    //   ...
    // };
    return res.status(err?.statusCode || 400).send(pick(err, 'message', 'errors'));
  });
};
