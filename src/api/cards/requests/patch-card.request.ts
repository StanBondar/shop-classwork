import { IsNumber, Min } from "class-validator";
import { BaseRequest } from "../../../tools/wrapper.helpers";

const MIN_SUM_VALUE = 1;
export class PathCardRequest extends BaseRequest {
  @IsNumber()
  @Min(MIN_SUM_VALUE)
  sum: number;
}