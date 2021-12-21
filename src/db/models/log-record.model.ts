import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";
import { UserActionsEnum } from "../../enums/user-actions.enum";

@Entity()
export class LogRecordModel<T = any> {
    
    @ObjectIdColumn()
    id: ObjectID;
    
    @Column()
    entity: UserActionsEnum;

    @Column()
    userId: number;

    @Column()
    payload: T;
}