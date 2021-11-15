import { assign, keys, pick } from "lodash";
import { CardEntity } from "../../../db/entities/card.entity";

export class CardResponse {
  number: string = undefined;
  id: number = undefined;

  constructor(data?: CardEntity) {
    if(data) {
      // assign(this, pick(data, keys(new CardResponse())))
      this.number = `*${data.number.slice(-4)}`;
      this.id = data.id;
    }
  }
}