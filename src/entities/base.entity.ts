import faker from 'faker';

export abstract class BaseEntity {
  public id: string;

  constructor(data: Partial<BaseEntity>) {
    this.id = data?.id;
  }
}
