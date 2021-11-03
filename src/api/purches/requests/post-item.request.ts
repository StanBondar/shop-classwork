import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { BaseRequest } from '../../../tools/wrapper.helpers';

export const MIN_ITEM_PRICE = 1;

export class PostPurchaseRequest extends BaseRequest {
  @IsInt()
  itemId: number;

  @IsInt()
  count: number;
}
