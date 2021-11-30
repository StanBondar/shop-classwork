import { IsNumber, IsOptional, Min } from "class-validator";
import { BaseRequest } from "../../../tools/wrapper.helpers";
import { MIN_ITEM_PRICE, MIN_ITEM_QUANTITY } from "./post-item.request";


export class PatchItemRequest extends BaseRequest {
  @IsNumber()
  @Min(MIN_ITEM_QUANTITY)
  @IsOptional()
  quantity: number;

  @IsNumber()
  @Min(MIN_ITEM_PRICE)
  @IsOptional()
  price: number;
}