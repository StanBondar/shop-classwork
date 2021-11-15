import { IsString, Matches, MaxLength } from "class-validator";
import { BaseRequest } from "../../../tools/wrapper.helpers";

export const CARD_NUMBER_LENGTH = 16;
export const CVV_LENGTH = 3;
export const CardRegEx = /[0-9]{16}/;
export const CVVRegEx = /[0-9]{3}/;
export const EXPRegEx = /^(0[1-9]|1[1-2])\/([0-9]{2})$/;

export class PostCardRequest extends BaseRequest {
  @IsString()
  @MaxLength(CARD_NUMBER_LENGTH)
  @Matches(CardRegEx)
  number: string;
  
  @IsString()
  @MaxLength(CVV_LENGTH)
  @Matches(CVVRegEx)
  cvv: string;

  @IsString()
  @Matches(EXPRegEx)
  expired: string;
}