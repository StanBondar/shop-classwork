import { Express, json } from 'express';

export const registerRouters = (app: Express) => {
  app.use(json());
};
