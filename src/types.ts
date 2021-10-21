import { Request } from 'express';
import { UserEntity } from './db/entities/user.entity';

export type RequestData<
  T = { [key: string]: string },
  T1 = { [key: string]: string | number },
  T2 = { [key: string]: string }
> = {
  query: T2;
  body: T1;
  params: T;
};

export type Aa<T, T1 extends 'query' | 'body' | 'params'> = T1 extends 'query'
  ? { query: T }
  : T1 extends 'body'
  ? { body: T }
  : { params: T };

export type B<T extends 'query' | 'body' | 'params', T1> = keyof T;

// let a: B<{ key: 'query'; type: string }>;
// export type BB
// extends {query,body,params}> =
export type EndpointHandler<
  P = {
    [key: string]: string;
  },
  ReqBody = any,
  ReqQuery = { [key: string]: undefined | string | string[] }
> = (
  data: Partial<{ body: ReqBody; params: P; query: ReqQuery }>
) => Promise<any>;

export type Join<T, T1 = any, T2 = any> = T & T1 & T2;

interface RegUser {
  body: { firstName: string };

  params: { role: string };
}

export interface IRequest extends Request {
  user: UserEntity;
}
