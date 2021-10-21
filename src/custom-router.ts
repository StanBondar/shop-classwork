import { Router } from 'express';

export class CustomRouter {
  constructor(private router: Router, private path: string = '/') {
    this.router = Router();
  }

  handlerNamesToRouter = new Map<
    HandlerNameEnum,
    (func, path?: string) => void
  >()
    .set(HandlerNameEnum.GET, (func, path?: string) => {
      this.router.get(this.path + path, func);
    })
    .set(HandlerNameEnum.POST, (func, path?: string) => {
      this.router.post(this.path + path, func);
    })
    .set(HandlerNameEnum.PATCH, (func, path?: string) => {
      this.router.patch(this.path + path, func);
    })
    .set(HandlerNameEnum.DELETE, (func, path?: string) => {
      this.router.delete(this.path + path, func);
    })
    .set(HandlerNameEnum.PUT, (func, path?: string) => {
      this.router.put(this.path + path, func);
    });
}

export enum HandlerNameEnum {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  PUT = 'PUT',
}
