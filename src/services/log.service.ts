import { getMongoRepository, MongoRepository } from "typeorm";
import { Base } from "../db/entities/base.entity";
import { LogRecordModel } from "../db/models/log-record.model";
import { TCreateLogRecord } from "../types";

export class CLogService {
  public readonly logRepository:MongoRepository<LogRecordModel<unknown>>;
  
  constructor() {
    this.logRepository = getMongoRepository(LogRecordModel, 'mongodb1')
  }

  async addLogRecord<TPayload extends Base>(payload: TCreateLogRecord<TPayload>) {
    await this.logRepository.insert(payload);
  }
}