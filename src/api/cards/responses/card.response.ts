import { assign, keys, pick } from "lodash";
import { CardEntity } from "../../../db/entities/card.entity";

export class CardResponse {
  number: string = undefined;
  id: number = undefined;

  constructor(data?: CardEntity) {
    if(data) {
      this.number = `*${data.number.slice(-4)}`;
      this.id = data.id;
    }
  }
} 