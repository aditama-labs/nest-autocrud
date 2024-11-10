import { ReadProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { TypeORMProcess } from './typeorm.process';

export class TypeORMReadProcess<T> extends TypeORMProcess<T> implements ReadProcess {
  public identityData;
  public identityKey: string = 'id';

  async process() {
    this.result = await this.service.getRepository().findOne(this.identityData);
  }
}
