import { UserRoleEnum } from "../../../enums/user-role.enum";

export class AccountResponse {
  login: string;
  id: number;
  role: UserRoleEnum,

  constructor(data: User)
}