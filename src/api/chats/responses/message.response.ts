import { MessageEntity } from "../../../db/entities/message.entity";

export class MessageResponse {
  message: string;
  senderId: number;
  sentDate: Date;
  id: number;

  constructor(message: MessageEntity) {
    if(message){
      this.message = message.data;
      this.senderId = message.senderId;
      this.id = message.id;
      this.sentDate = message.createDate
    }
  }
}