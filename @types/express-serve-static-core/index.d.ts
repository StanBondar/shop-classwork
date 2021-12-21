import { UserEntity } from "../../src/db/entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      user: UserEntity,
      entity: any
    }
  }
} 